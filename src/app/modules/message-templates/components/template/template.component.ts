import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FsMessage } from '@firestitch/message';


@Component({
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  @Input() loadMessageTemplate: (message: any) => Observable<any>;
  @Input() saveMessageTemplate: (message: any) => Observable<any>;

  public message_template;

  constructor(private _dialogRef: MatDialogRef<TemplateComponent>,
              private _message: FsMessage,
              @Inject(MAT_DIALOG_DATA) private _data) {
    this.loadMessageTemplate = _data.loadMessageTemplate;
    this.saveMessageTemplate = _data.saveMessageTemplate;
  }

  public ngOnInit() {

    if (this._data.message_template.id) {
      this.loadMessageTemplate(this._data.message_template)
      .subscribe(message_template => {
        this.message_template = message_template;
      });
    } else {
      this.message_template = {};
    }
  }

  public save = () => {
    return this.saveMessageTemplate(this.message_template)
    .pipe(
      tap(message_template => {
        this._message.success('Saved Changes');
        this._dialogRef.close(message_template);
      })
    );
  }
}
