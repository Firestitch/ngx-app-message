import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { FsMessage } from '@firestitch/message';
import { FsPrompt } from '@firestitch/prompt';

import { switchMap, tap } from 'rxjs/operators';

import { of } from 'rxjs';
import { PreviewComponent } from '../../../../modules/message-preview/components';
import { FS_APP_MESSAGE_CONFIG } from '../../../app-message/injectors';
import { FsAppMessageConfig } from '../../../app-message/interfaces';
import { EmailMessageFormats } from '../../consts';
import { EmailMessageFormat } from '../../enums';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsDialogModule } from '@firestitch/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatTabGroup, MatTab, MatTabContent } from '@angular/material/tabs';
import { FsTabsModule } from '@firestitch/tabs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsLabelModule } from '@firestitch/label';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { FsTextEditorModule } from '@firestitch/text-editor';
import { FsHtmlEditorModule, FsHtmlRendererModule } from '@firestitch/html-editor';
import { AttachmentsComponent } from '../attachments/attachments.component';
import { MatButton } from '@angular/material/button';


@Component({
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsSkeletonModule,
        FormsModule,
        FsFormModule,
        FsDialogModule,
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        MatTabGroup,
        FsTabsModule,
        MatTab,
        MatTabContent,
        MatFormField,
        MatLabel,
        MatInput,
        FsLabelModule,
        MatSelect,
        MatOption,
        FsTextEditorModule,
        FsHtmlEditorModule,
        FsHtmlRendererModule,
        AttachmentsComponent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
    ],
})
export class MessageComponent implements OnInit {
  private _config = inject<FsAppMessageConfig>(FS_APP_MESSAGE_CONFIG);
  private _data = inject(MAT_DIALOG_DATA);
  private _prompt = inject(FsPrompt);
  private _message = inject(FsMessage);
  private _dialog = inject(MatDialog);
  private _cdRef = inject(ChangeDetectorRef);


  public message;
  public tab = 'general';
  public messageTemplates = [];
  public emailMessageFormats = EmailMessageFormats;
  public emailMessageFormat = EmailMessageFormat;

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
