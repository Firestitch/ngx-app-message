import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FsMessage } from '@firestitch/message';
import { FsTextEditorConfig } from '@firestitch/text-editor';
import { PreviewComponent } from '../../../../modules/message-preview/components';


@Component({
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  @Input() loadMessageTemplate: (message: any) => Observable<any>;
  @Input() saveMessageTemplate: (message: any) => Observable<any>;

  public messageTemplate;
  public htmlEditorconfig: FsTextEditorConfig = {
    language: 'html',
  };

  public cssEditorconfig: FsTextEditorConfig = {
    language: 'scss',
  };

  constructor(
    private _dialogRef: MatDialogRef<TemplateComponent>,
    private _message: FsMessage,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private _data,
  ) {
    this.loadMessageTemplate = _data.loadMessageTemplate;
    this.saveMessageTemplate = _data.saveMessageTemplate;
  }

  public ngOnInit() {

    if (this._data.messageTemplate.id) {
      this.loadMessageTemplate(this._data.messageTemplate)
      .subscribe(messageTemplate => {
        this.messageTemplate = messageTemplate;
      });
    } else {
      this.messageTemplate = {};
    }
  }

  public openPreview() {
    this._dialog.open(PreviewComponent, {
      data: {
        styles: this.messageTemplate.styles,
        html: this.messageTemplate.content,
      },
      width: '95%'
    });
  }

  public save = () => {
    return this.saveMessageTemplate(this.messageTemplate)
    .pipe(
      tap(messageTemplate => {
        this._message.success('Saved Changes');
        this._dialogRef.close(messageTemplate);
      })
    );
  }
}
