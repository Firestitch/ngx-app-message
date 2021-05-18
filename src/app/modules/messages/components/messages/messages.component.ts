import { AdminService } from './../../../admin/services/admin.service';
import { Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';

import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { FsListComponent, FsListConfig } from '@firestitch/list';
import { ItemType } from '@firestitch/filter';

import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../message';
import { EmailMessageFormats } from '../../consts';
import { indexNameValue } from '../../../../helpers';
import { LoadMessage, LoadMessages, LoadTemplates, SaveMessage, TestEmail, TestMessage } from '../../types';


@Component({
  selector: 'fs-admin-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit, OnDestroy {

  @Input() loadMessages: LoadMessages;
  @Input() loadTemplates: LoadTemplates;
  @Input() loadMessage: LoadMessage;
  @Input() saveMessage: SaveMessage;
  @Input() testMessage: TestMessage;
  @Input() testEmail: TestEmail;

  @ViewChild('list', { static: true })
  public list: FsListComponent = null;

  public config: FsListConfig = null;
  public emailMessageFormats = {};

  private _destroy$ = new Subject();

  constructor(
    private _dialog: MatDialog,
    private _adminService: AdminService
  ) { }

  public ngOnInit() {

    this.emailMessageFormats = indexNameValue(EmailMessageFormats);

    this.config = {
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search'
        }
      ],

      fetch: query => {
        return this.loadMessages(query)
        .pipe(
          map(response => {
            return ({ data: this._adminService.input(response.data), paging: response.paging })
          })
        );
      }
    }
  }

  public open(message) {
    const dialogRef = this._dialog.open(MessageComponent, {
      data: {
        message: message,
        loadTemplates: this.loadTemplates,
        loadMessage: this.loadMessage,
        saveMessage: this.saveMessage,
        testMessage: this.testMessage,
        testEmail: this.testEmail
      },
      width: '85%'
    });

    dialogRef.afterClosed()
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe((response) => {
      if (response) {
        this.list.updateData(
          response,
          (row: any) => {
            return row.id === response.id;
          });
      }
    })
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
