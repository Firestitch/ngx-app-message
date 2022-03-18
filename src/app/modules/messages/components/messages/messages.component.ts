import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { FsListComponent, FsListConfig } from '@firestitch/list';
import { ItemType } from '@firestitch/filter';

import { MessageComponent } from '../message';
import { EmailMessageFormats } from '../../consts';
import { indexNameValue } from '../../../../helpers';
import { FS_APP_MESSAGE_CONFIG } from '../../../app-message/injectors';
import { FsAppMessageConfig } from '../../../app-message/interfaces';

@Component({
  selector: 'fs-app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit, OnDestroy {

  @ViewChild(FsListComponent, { static: true })
  public list: FsListComponent = null;

  public config: FsListConfig = null;
  public emailMessageFormats = {};

  private _destroy$ = new Subject();

  constructor(
    @Inject(FS_APP_MESSAGE_CONFIG) private _config: FsAppMessageConfig,
    private _dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
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
        return this._config.loadMessages(query)
        .pipe(
          map(response => {
            return ({ data: response.data, paging: response.paging })
          })
        );
      }
    }
  }

  public open(message) {
    const dialogRef = this._dialog.open(MessageComponent, {
      data: {
        message: message,
      },
      width: '85%'
    });

    dialogRef.afterClosed()
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(() => {
      this.list.reload();
    })
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
