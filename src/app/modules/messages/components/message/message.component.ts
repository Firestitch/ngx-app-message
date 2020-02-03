import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FsMessage } from '@firestitch/message';
import { EmailMessageFormats } from '../../consts';
import { EmailMessageFormat } from '../../enums';
import { FsPrompt } from '@firestitch/prompt';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() loadTemplates: () => Observable<any[]>;
  @Input() loadMessage: (message: any) => Observable<any>;
  @Input() saveMessage: (message: any) => Observable<any>;
  @Input() testMessage: (message: any, email: string) => Observable<any>;
  @Input() testEmail: () => string;

  public message;
  public message_templates = [];
  public emailMessageFormats = EmailMessageFormats;
  public emailMessageFormat = EmailMessageFormat;

  constructor(private _prompt: FsPrompt,
              private _message: FsMessage,
              @Inject(MAT_DIALOG_DATA) private _data) {
    this.loadTemplates = _data.loadTemplates;
    this.loadMessage = _data.loadMessage;
    this.saveMessage = _data.saveMessage;
    this.testMessage = _data.testMessage;
    this.testEmail = _data.testEmail;
  }

  public ngOnInit() {
    this.loadMessage(this._data.message)
    .subscribe(response => {
      this.message = response;
    });

    this.loadTemplates()
    .subscribe(response => {
      this.message_templates = response;
    });
  }

  public save = () => {
    return this.saveMessage(this.message)
    .pipe(
      tap(message => {
        this._message.success('Saved Changes');
      })
    );
  }


  public sendTest() {
    this._prompt.input({
      label: 'Please an email to send test to',
      title: 'Send Test',
      commitLabel: 'Send',
      default: this.testEmail(),
      required: true
    }).subscribe((value: string) => {
      this.testMessage(this.message, value)
      .subscribe(message => {
        this._message.success('Test Sent');
      });
    });
  }
}
