import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { FsMessage } from '@firestitch/message';
import { FsTextEditorConfig, FsTextEditorModule } from '@firestitch/text-editor';
import { SubmitEvent, FsFormModule } from '@firestitch/form';

import { tap } from 'rxjs/operators';

import { PreviewComponent } from '../../../../modules/message-preview/components';
import { FS_APP_MESSAGE_CONFIG } from '../../../app-message/injectors';
import { FsAppMessageConfig } from '../../../app-message/interfaces';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FormsModule } from '@angular/forms';
import { FsDialogModule } from '@firestitch/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTabGroup, MatTab, MatTabContent } from '@angular/material/tabs';
import { FsLabelModule } from '@firestitch/label';
import { MatButton } from '@angular/material/button';


@Component({
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.scss'],
    standalone: true,
    imports: [FsSkeletonModule, FormsModule, FsFormModule, FsDialogModule, MatDialogTitle, CdkScrollable, MatDialogContent, MatFormField, MatLabel, MatInput, MatTabGroup, MatTab, MatTabContent, FsLabelModule, FsTextEditorModule, MatDialogActions, MatButton, MatDialogClose]
})
export class TemplateComponent implements OnInit {

  public messageTemplate;
  public htmlEditorconfig: FsTextEditorConfig = {
    language: 'html',
    insertSpaces: true,
    tabSize: 2,
  };

  public cssEditorconfig: FsTextEditorConfig = {
    language: 'scss',
    insertSpaces: true,
    tabSize: 2,
  };

  public constructor(
    @Inject(MAT_DIALOG_DATA) private _data,
    @Inject(FS_APP_MESSAGE_CONFIG) private _config: FsAppMessageConfig,
    private _dialogRef: MatDialogRef<TemplateComponent>,
    private _message: FsMessage,
    private _dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    if (this._data.messageTemplate.id) {
      this._config.loadMessageTemplate(this._data.messageTemplate)
      .subscribe(messageTemplate => {
        this.messageTemplate = messageTemplate;
      });
    } else {
      this.messageTemplate = {};
    }
  }

  public openPreview(): void {
    this._dialog.open(PreviewComponent, {
      data: {
        styles: this.messageTemplate.styles,
        html: this.messageTemplate.content,
      },
      width: '95%',
    });
  }

  public save = (event: SubmitEvent) => {
    return this._config.saveMessageTemplate(this.messageTemplate)
      .pipe(
        tap((messageTemplate) => {
          this._message.success('Saved Changes');
          if (event.submitter === 'save-close') {
            this._dialogRef.close(messageTemplate);
          }
        })
      );
  }
}
