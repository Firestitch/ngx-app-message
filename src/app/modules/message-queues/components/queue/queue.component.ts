import {
  Component, OnInit, Inject, OnDestroy,
} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { FsMessage } from '@firestitch/message';
import { FsPrompt } from '@firestitch/prompt';
import { FsListConfig } from '@firestitch/list';

import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { EmailMessageQueueFormat } from '../../enums';
import { MessageQueueStates } from '../../consts';
import { AdminService } from './../../../admin/services/admin.service';
import { indexNameValue } from '../../../../helpers';
import { MessageComponent } from '../../../../modules/messages/components';
import {
  DownloadAttachment, ForwardMessageQueue, LoadAttachments,
  LoadLogs, LoadMessage, LoadMessageQueue, LoadTemplates,
  ResendMessageQueue, SaveMessage, TestEmail, TestMessage,
} from '../../../messages/types';


@Component({
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
})
export class QueueComponent implements OnInit, OnDestroy {

  public loadMessageQueue: LoadMessageQueue;
  public loadLogs: LoadLogs;
  public loadAttachments: LoadAttachments;
  public downloadAttachment: DownloadAttachment;
  public resendMessageQueue: ResendMessageQueue;
  public forwardMessageQueue: ForwardMessageQueue;
  public loadMessage: LoadMessage;
  public saveMessage: SaveMessage;
  public testMessage: TestMessage;
  public loadTemplates: LoadTemplates;
  public testEmail: TestEmail;

  public messageQueue;
  public emailMessageQueueFormat = EmailMessageQueueFormat;
  public messageQueueStates;
  public logConfig: FsListConfig;
  public attachmentConfig: FsListConfig;

  private _destroy$ = new Subject();

  constructor(
    private _message: FsMessage,
    private _prompt: FsPrompt,
    private _dialog: MatDialog,
    private _adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) private _data,
  ) {
    this.loadMessageQueue = _data.loadMessageQueue;
    this.saveMessage = _data.saveMessage;
    this.loadMessage = _data.loadMessage;
    this.loadLogs = _data.loadLogs;
    this.resendMessageQueue = _data.resendMessageQueue;
    this.loadAttachments = _data.loadAttachments;
    this.downloadAttachment = _data.downloadAttachment;
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
      label: 'Please enter an email to forward to',
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

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _setLogsConfig(messageQueue) {
    this.logConfig = {
      loadMore: true,
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
        return this.loadAttachments(messageQueue, query)
          .pipe(
            map(response => ({
              data: response.data.map(value => {
                value.prettyFilesize = this._prettyFilesize(value.filesize);
                return value;
              }), paging: response.paging
            }))
          );
      }
    };

    if (this.downloadAttachment) {
      this.attachmentConfig.rowActions = [
        {
          click: (messageAttachment) => {
            this.downloadAttachment(messageAttachment, this.messageQueue);
          },
          label: 'Download',
        }
      ];
    }
  }

  private _prettyFilesize(bytes) {
    if (bytes === 0) { return '0.00 B'; }
    const e = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B';
  }
}
