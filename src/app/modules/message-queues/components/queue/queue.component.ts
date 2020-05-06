import { AdminService } from './../../../admin/services/admin.service';
import { Component, OnInit, Inject, QueryList, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FsMessage } from '@firestitch/message';
import { EmailMessageQueueFormat } from '../../enums';
import { MessageQueueStates } from '../../consts';
import { FsPrompt } from '@firestitch/prompt';
import { FsListConfig, PaginationStrategy } from '@firestitch/list';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { indexNameValue } from '../../../../helpers';
import { MessageComponent } from '../../../../modules/messages/components';



@Component({
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit, AfterViewInit {

  @ViewChildren('bodyFrame') bodyFrame: QueryList<ElementRef>;

  public loadMessageQueue: (messageQueueId: number) => Observable<any>;
  public loadLogs: (messageQueue: any, query: any) => Observable<any>;
  public loadAttachments: (messageQueue: any, query: any) => Observable<any>;
  public resendMessageQueue: (messageQueue: any) => Observable<any>;
  public forwardMessageQueue: (messageQueue: any, email: string) => Observable<any>;
  public loadMessage: (messageId: number) => Observable<any>;
  public saveMessage: (message: any) => Observable<any>;
  public testMessage: (message: any, email: string) => Observable<any>;
  public loadTemplates: () => Observable<any>;
  public testEmail: () => string;

  public messageQueue;
  public emailMessageQueueFormat = EmailMessageQueueFormat;
  public messageQueueStates;
  public logConfig: FsListConfig;
  public attachmentConfig: FsListConfig;

  constructor(private _message: FsMessage,
              private _prompt: FsPrompt,
              private _dialog: MatDialog,
              private _adminService: AdminService,
              @Inject(MAT_DIALOG_DATA) private _data) {
    this.loadMessageQueue = _data.loadMessageQueue;
    this.saveMessage = _data.saveMessage;
    this.loadMessage = _data.loadMessage;
    this.loadLogs = _data.loadLogs;
    this.resendMessageQueue = _data.resendMessageQueue;
    this.loadAttachments = _data.loadAttachments;
    this.forwardMessageQueue = _data.forwardMessageQueue;
    this.loadTemplates = _data.loadTemplates;
    this.testEmail = _data.testEmail;
  }

  public ngOnInit() {

    this.messageQueueStates = indexNameValue(MessageQueueStates);
    this.loadMessageQueue(this._data.messageQueue.id)
    .subscribe(messageQueue => {
      this.messageQueue = this._adminService.input(messageQueue);
      this._setLogsConfig(messageQueue);
      this._setAttachmentsConfig(messageQueue);
    });
  }

  public ngAfterViewInit() {
    this.bodyFrame.changes
    .subscribe(() => {
      this._updateBodyFrames();
    });

    this._updateBodyFrames();
  }

  private _updateBodyFrames() {

    this.bodyFrame.forEach(bodyFrame => {
      const win: Window = bodyFrame.nativeElement.contentWindow;
      const doc: Document = win.document;
      const data = `<style>
                      body {
                        font-family: Roboto;
                        font-size: 15px;
                        margin: 0 !important;
                        overflow-y: hidden !important;
                        box-sizing: border-box !important;
                        width: auto !important;
                      }

                      a {
                        color: #1155CC;
                      }
                      </style>` + this.messageQueue.emailMessageQueue.body;
      doc.open();
      doc.write(data);
      doc.close();

      bodyFrame.nativeElement.setAttribute('height', doc.body.scrollHeight);
    });
  }

  public openMessage(message) {
    this._dialog.open(MessageComponent, {
      data: {
        message: message,
        saveMessage: this.saveMessage,
        loadMessage: this.loadMessage,
        testMessage: this.testMessage,
        loadTemplates: this.loadTemplates,
        testEmail: this.testEmail
      },
      width: '85%'
    });
  }

  public resend() {
    this._prompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to resend this message?'
    }).subscribe(() => {
      this.resendMessageQueue(this._adminService.output(this.messageQueue))
      .subscribe(messageQueue => {
        Object.assign(this.messageQueue, messageQueue);
        this._message.success('Successfully resent');
      });
    });
  }

  public forward() {
    this._prompt.input({
      label: 'Please an email to forward to',
      title: 'Forward Message',
      commitLabel: 'Forward',
      required: true
    }).subscribe((value: string) => {
      if (value) {
        this.forwardMessageQueue(this._adminService.output(this.messageQueue), value)
        .subscribe(messageQueue => {
          Object.assign(this.messageQueue, messageQueue);
          this._message.success('Successfully forwarded');
        });
      }
    });
  }

  private _setLogsConfig(messageQueue) {
    this.logConfig = {
      paging: {
        strategy: PaginationStrategy.LoadMore
      },
      queryParam: false,
      fetch: query => {
        return this.loadLogs(messageQueue, query);
      }
    }
  }

  private _setAttachmentsConfig(messageQueue) {
    this.attachmentConfig = {
      queryParam: false,
      fetch: query => {
        return  this.loadAttachments(messageQueue, query)
          .pipe(
            map(response => ({ data: response.data.map(value => {
              value.prettyFilesize = this._prettyFilesize(value.filesize);
              return value;
            }), paging: response.paging }))
          );
      }
    }
  }

  private _prettyFilesize(bytes) {
    if (bytes === 0) { return '0.00 B'; }
    const e = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B';
  }
}
