import { Component, OnInit, Inject, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FsMessage } from '@firestitch/message';
import { FsPrompt } from '@firestitch/prompt';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { EmailMessageFormats } from '../../consts';
import { EmailMessageFormat } from '../../enums';
import { AdminService } from './../../../admin/services/admin.service';
import { PreviewComponent } from '../../../../modules/message-preview/components';


@Component({
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnInit {

  @Input() loadTemplates: () => Observable<any[]>;
  @Input() loadMessage: (message: any) => Observable<any>;
  @Input() saveMessage: (message: any) => Observable<any>;
  @Input() testMessage: (message: any, recipient: string, type: 'sms' | 'email') => Observable<any>;
  @Input() testEmail: () => string;

  public message;
  public tab;
  public messageTemplates = [];
  public emailMessageFormats = EmailMessageFormats;
  public emailMessageFormat = EmailMessageFormat;

  constructor(
    private _prompt: FsPrompt,
    private _message: FsMessage,
    private _adminService: AdminService,
    private _dialog: MatDialog,
    private _cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private _data,
  ) {
    this.loadTemplates = _data.loadTemplates;
    this.loadMessage = _data.loadMessage;
    this.saveMessage = _data.saveMessage;
    this.testMessage = _data.testMessage;
    this.testEmail = _data.testEmail;
  }

  public ngOnInit() {
    this.loadMessage(this._data.message)
    .subscribe((response) => {
      this.message = this._adminService.input(response);

      if (this.message.emailMessage.customize === undefined) {
        this.message.emailMessage.customize = true;
      }
      if (this.message.smsMessage.customize === undefined) {
        this.message.smsMessage.customize = true;
      }

      this._cdRef.markForCheck();
    });

    this.loadTemplates()
    .subscribe((response) => {
      this.messageTemplates = response;
      this._cdRef.markForCheck();
    });
  }

  public tabChange(event: MatTabChangeEvent) {
    switch (event.tab.textLabel) {
      case 'SMS Message':
        this.tab = 'sms';
        break;
      case 'Email Message':
        this.tab = 'email';
        break;
      default:
        this.tab = null;
    }
  }

  public save = () => {
    return this.saveMessage(this._adminService.output(this.message))
    .pipe(
      tap(() => {
        this._message.success('Saved Changes');
      })
    );
  }

  public openPreview(): void {
    let html = this.message.emailMessage.body;
    let styles = this.message.emailMessage.styles;

    if (this.message.emailMessage.messageTemplateId) {
      const messageTemplate = this.messageTemplates
        .find((item) => {
          return this.message.emailMessage.messageTemplateId === item.id;
        });

      if (messageTemplate) {
        html = messageTemplate.content.replace('{$content}', html);
        styles = messageTemplate.styles.concat(styles);
      }
    }

    this._dialog.open(PreviewComponent, {
      data: {
        styles,
        html,
      },
      width: '95%'
    });
  }

  public sendTest(type) {
    this._prompt.input({
      label: 'Please an email to send test to',
      title: 'Send Test',
      commitLabel: 'Send',
      default: this.testEmail(),
      required: true
    }).subscribe((value: string) => {
      this.testMessage(this._adminService.output(this.message), value, type)
      .subscribe(() => {
        this._message.success('Test Sent');
      });
    });
  }
}
