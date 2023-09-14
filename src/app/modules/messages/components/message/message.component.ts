import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { FsMessage } from '@firestitch/message';
import { FsPrompt } from '@firestitch/prompt';

import { switchMap, tap } from 'rxjs/operators';

import { of } from 'rxjs';
import { PreviewComponent } from '../../../../modules/message-preview/components';
import { FS_APP_MESSAGE_CONFIG } from '../../../app-message/injectors';
import { FsAppMessageConfig } from '../../../app-message/interfaces';
import { EmailMessageFormats } from '../../consts';
import { EmailMessageFormat } from '../../enums';


@Component({
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnInit {

  public message;
  public tab = 'general';
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
      .subscribe((message) => {
        this.message = message;

        if (this.message.emailMessage && this.message.emailMessage.customize === undefined) {
          this.message.emailMessage.customize = true;
        }
        if (this.message.smsMessage && this.message.smsMessage.customize === undefined) {
          this.message.smsMessage.customize = true;
        }

        this.message.reference = String(message.tag)
          .toLocaleLowerCase()
          .split('_')
          .map((item: string) => item.charAt(0).toUpperCase() + item.slice(1))
          .join('');

        this._cdRef.markForCheck();
      });

    this._config.loadMessageTemplates()
      .subscribe((data) => {
        this.messageTemplates = data.data;
        this._cdRef.markForCheck();
      });
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
    const emailMessage = this.message.emailMessage;
    let html = emailMessage.customize ? emailMessage.body : this.message.defaultEmailBody;
    let styles = emailMessage.styles || '';

    if (emailMessage.messageTemplateId) {
      const messageTemplate = this.messageTemplates
        .find((item) => {
          return emailMessage.messageTemplateId === item.id;
        });

      if (messageTemplate) {
        html = messageTemplate.content.replace('{$content}', html);
        styles = `${messageTemplate.styles || ''}\n\n${styles}`;
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
