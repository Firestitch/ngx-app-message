import { Component, OnInit, Inject, Input, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
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

  public messageTemplate;

  constructor(private _dialogRef: MatDialogRef<TemplateComponent>,
              private _message: FsMessage,
              @Inject(MAT_DIALOG_DATA) private _data) {
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
