import { AdminService } from './../../../admin/services/admin.service';
import { Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';

import { takeUntil, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { FsListComponent, FsListConfig } from '@firestitch/list';
import { ItemType } from '@firestitch/filter';

import { MatDialog } from '@angular/material/dialog';
import { map as _map } from 'lodash-es';
import { QueueComponent } from '../queue';
import { MessageQueueStates } from '../../consts';
import { indexNameValue } from '../../../../helpers';


@Component({
  selector: 'fs-admin-message-queues',
  templateUrl: './queues.component.html'
})
export class QueuesComponent implements OnInit, OnDestroy {

  @ViewChild('list', { static: true }) public list: FsListComponent = null;

  @Input() loadMessages: () => Observable<any[]>;
  @Input() loadMessageQueues: (query: any) => Observable<{ data: any[], paging: any }>;
  @Input() loadMessageQueue: (messageQueue: any) => Observable<any>;
  @Input() loadLogs: (messageQueue: any, query: any) => Observable<any>;
  @Input() loadAttachments: (messageQueue: any) => Observable<any>;
  @Input() resendMessageQueue: (messageQueue: any) => Observable<any>;
  @Input() forwardMessageQueue: (messageQueue: number, email: string) => Observable<any>;
  @Input() loadMessage: (messageId: number) => Observable<any>;
  @Input() saveMessage: (message: any) => Observable<any>;
  @Input() testMessage: (message: any, email: string) => Observable<any>;
  @Input() loadTemplates: () => Observable<any[]>;
  @Input() testEmail: () => Observable<string>;

  public config: FsListConfig = null;
  public messageQueueStates = {};

  private _destroy$ = new Subject();

  constructor(
    private _dialog: MatDialog,
    private _adminService: AdminService
  ) { }

  public ngOnInit() {

    this.messageQueueStates = indexNameValue(MessageQueueStates);

    this.config = {
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search'
        },
        {
          name: 'state',
          type: ItemType.Select,
          label: 'Status',
          values: () => {
            return MessageQueueStates;
          }
        },
        {
          name: 'date',
          type: ItemType.DateRange,
          label: ['From Date', 'To Date'],
        },
      ],
      sort: { value: 'created_date', direction: 'desc' },
      fetch: query => {
        query.messageQueueAttachmentCounts = true;
        return this.loadMessageQueues(query)
          .pipe(
            map(response => ({ data: this._adminService.input(response.data), paging: response.paging }))
          )
      }
    };

    if (this.loadMessages) {
      this.config.filters.push({
        name: 'message_id',
        type: ItemType.Select,
        label: 'Message Type',
        values: () => {
          return this.loadMessages()
            .pipe(
              map(items => {
                return _map(items, (item) => ({ name: item.name, value: item.id }))
              })
            )
        }
      });
    }
  }

  public open(messageQueue) {
    const dialogRef = this._dialog.open(QueueComponent, {
      data: {
        messageQueue: messageQueue,
        loadMessageQueue: this.loadMessageQueue,
        loadLogs: this.loadLogs,
        loadAttachments: this.loadAttachments,
        resendMessageQueue: this.resendMessageQueue,
        forwardMessageQueue: this.forwardMessageQueue,
        loadMessage: this.loadMessage,
        saveMessage: this.saveMessage,
        testMessage: this.testMessage,
        loadTemplates: this.loadTemplates,
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
