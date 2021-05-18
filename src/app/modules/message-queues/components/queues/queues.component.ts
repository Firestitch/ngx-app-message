import { AdminService } from './../../../admin/services/admin.service';
import { Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';

import { takeUntil, map, switchMap, tap } from 'rxjs/operators';
import { Subject, Observable, of } from 'rxjs';

import { FsListActionSelected, FsListComponent, FsListConfig } from '@firestitch/list';
import { ItemType } from '@firestitch/filter';

import { MatDialog } from '@angular/material/dialog';
import { QueueComponent } from '../queue';
import { MessageQueueStates } from '../../consts';
import { indexNameValue } from '../../../../helpers';
import { SelectionActionType } from '@firestitch/selection';
import {
  DownloadAttachment, ForwardMessageQueue, LoadAttachments, LoadLogs,
  LoadMessage,
  LoadMessageQueue, LoadMessageQueues, LoadMessages, LoadTemplates, ResendMessageQueue,
  SaveMessage,
  TestMessage,
} from '../../../messages/types';


@Component({
  selector: 'fs-admin-message-queues',
  styleUrls: ['./queues.component.scss'],
  templateUrl: './queues.component.html'
})
export class QueuesComponent implements OnInit, OnDestroy {

  @ViewChild('list', { static: true }) public list: FsListComponent = null;

  @Input() public loadMessages: LoadMessages;
  @Input() public loadMessageQueues: LoadMessageQueues;
  @Input() public loadMessageQueue: LoadMessageQueue;
  @Input() public loadLogs: LoadLogs;
  @Input() public loadAttachments: LoadAttachments;
  @Input() public downloadAttachment: DownloadAttachment;
  @Input() public resendMessageQueue: ResendMessageQueue;
  @Input() public forwardMessageQueue: ForwardMessageQueue;
  @Input() public loadMessage: LoadMessage;
  @Input() public saveMessage: SaveMessage;
  @Input() public testMessage: TestMessage;
  @Input() public loadTemplates: LoadTemplates;
  @Input() public testEmail: () => Observable<string>;
  @Input() public cancelMessageQueues: (event: FsListActionSelected) => Observable<any>;

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

    // if any bulk actions add the selection object to config.
    if (this.cancelMessageQueues) {
      this.config.selection = {
        selectAll: false,
        actions: [
        ],
        actionSelected: (action: FsListActionSelected) => {
          return of(true)
            .pipe(
              switchMap(() => {
                if (action.name === 'cancel') {
                  return this.cancelMessageQueues(action);
                // } else if (action.value === 'otherthing') {
                //   return this.otherMessageQueues(action);
                }
                return of(true);
              }),
              tap(() => {
                this.list.reload();
              }),
            );
        }
      };
    }

    // add each individual bulk action to select actions
    if (this.cancelMessageQueues) {
      this.config.selection.actions.push({
        type: SelectionActionType.Action,
        name: 'cancel',
        label: 'Cancel Queued',
      });
    }

    if (this.loadMessages) {
      this.config.filters.push({
        name: 'message_id',
        type: ItemType.Select,
        label: 'Message Type',
        values: (query) => {
          return this.loadMessages(query)
            .pipe(
              map((items: any) => {
                return items.map((item) => ({ name: item.name, value: item.id }));
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
        downloadAttachment: this.downloadAttachment,
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
