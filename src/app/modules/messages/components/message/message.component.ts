import { Component, OnInit, Inject, Input } from '@angular/core';

import { MatTabChangeEvent } from '@angular/material/tabs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FsMessage } from '@firestitch/message';
import { FsPrompt } from '@firestitch/prompt';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { EmailMessageFormats } from '../../consts';
import { EmailMessageFormat } from '../../enums';
import { AdminService } from './../../../admin/services/admin.service';


@Component({
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
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
    .subscribe(response => {
      this.message = this._adminService.input(response);
    });

    this.loadTemplates()
    .subscribe(response => {
      this.messageTemplates = response;
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
