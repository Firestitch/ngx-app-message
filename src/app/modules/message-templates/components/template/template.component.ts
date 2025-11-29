import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTab, MatTabContent, MatTabGroup } from '@angular/material/tabs';

import { FsDialogModule } from '@firestitch/dialog';
import { FsFormModule, SubmitEvent } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FsMessage } from '@firestitch/message';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsTextEditorConfig, FsTextEditorModule } from '@firestitch/text-editor';

import { tap } from 'rxjs/operators';

import { PreviewComponent } from '../../../../modules/message-preview/components';
import { FS_APP_MESSAGE_CONFIG } from '../../../app-message/injectors';
import { FsAppMessageConfig } from '../../../app-message/interfaces';


@Component({
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  standalone: true,
  imports: [FsSkeletonModule, FormsModule, FsFormModule, FsDialogModule, MatDialogTitle, CdkScrollable, MatDialogContent, MatFormField, MatLabel, MatInput, MatTabGroup, MatTab, MatTabContent, FsLabelModule, FsTextEditorModule, MatDialogActions, MatButton, MatDialogClose],
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
  
  private _data = inject(MAT_DIALOG_DATA);
  private _config = inject<FsAppMessageConfig>(FS_APP_MESSAGE_CONFIG);
  private _dialogRef = inject<MatDialogRef<TemplateComponent>>(MatDialogRef);
  private _message = inject(FsMessage);
  private _dialog = inject(MatDialog);


  public ngOnInit(): void {
    if (this._data.messageTemplate.id) {
      this._config.loadMessageTemplate(this._data.messageTemplate)
        .subscribe((messageTemplate) => {
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
        }),
      );
  };
}
