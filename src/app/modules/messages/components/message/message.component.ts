import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FsMessage } from '@firestitch/message';
import { FsPrompt } from '@firestitch/prompt';

import { switchMap, tap } from 'rxjs/operators';

import { EmailMessageFormats } from '../../consts';
import { EmailMessageFormat } from '../../enums';
import { PreviewComponent } from '../../../../modules/message-preview/components';
import { FS_APP_MESSAGE_CONFIG } from '../../../app-message/injectors';
import { FsAppMessageConfig } from '../../../app-message/interfaces';
import { of } from 'rxjs';


@Component({
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnInit {

  public message;
  public tab;
  public messageTemplates = [];
  public emailMessageFormats = EmailMessageFormats;
  public emailMessageFormat = EmailMessageFormat;

  public constructor(
    @Inject(FS_APP_MESSAGE_CONFIG) private _config: FsAppMessageConfig,
    @Inject(MAT_DIALOG_DATA) private _data,
    private _prompt: FsPrompt,
    private _message: FsMessage,
    private _dialog: MatDialog,
    private _cdRef: ChangeDetectorRef,
  ) {
  }

  public ngOnInit() {
    this._config.loadMessage(this._data.message)
    .subscribe((response) => {
      this.message = response;

      if (this.message.emailMessage && this.message.emailMessage.customize === undefined) {
        this.message.emailMessage.customize = true;
      }
      if (this.message.smsMessage && this.message.smsMessage.customize === undefined) {
        this.message.smsMessage.customize = true;
      }

      this._cdRef.markForCheck();
    });

    this._config.loadMessageTemplates()
    .subscribe((data) => {
      this.messageTemplates = data.data;
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
    return this._config.saveMessage(this.message)
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
    of(true)
    .pipe(
      switchMap(() => {
        return type === 'email' ? this._config.getTestEmail() : of('');
      }),
      switchMap((default_) => {        
        const typeName = type === 'email' ? 'an email' : 'phone number';
    
        return this._prompt.input({
          label: `Please enter ${typeName} to send test to`,
          title: 'Send Test',
          commitLabel: 'Send',
          default: default_,
          required: true
        })
      })
    )
    .subscribe((value: string) => {
      this._config.testMessage(this.message, value, type)
        .subscribe(() => {
          this._message.success('Test Sent');
        });
    });
  }
}
