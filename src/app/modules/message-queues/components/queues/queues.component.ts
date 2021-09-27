import { Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { takeUntil, map, switchMap, tap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';

import { FsListActionSelected, FsListComponent, FsListConfig } from '@firestitch/list';
import { ItemType } from '@firestitch/filter';
import { SelectionActionType } from '@firestitch/selection';

import { QueueComponent } from '../queue';
import { MessageQueueStates } from '../../consts';
import { indexNameValue } from '../../../../helpers';
import { MessageQueueState } from '../../enums/message-queue-state.enum';
import { FS_APP_MESSAGE_CONFIG } from '../../../app-message/injectors';
import { FsAppMessageConfig } from '../../../app-message/interfaces';


@Component({
  selector: 'fs-app-message-queues',
  styleUrls: ['./queues.component.scss'],
  templateUrl: './queues.component.html'
})
export class QueuesComponent implements OnInit, OnDestroy {

  @ViewChild(FsListComponent, { static: true })
  public list: FsListComponent = null;

  @Input() public query = {};

  public config: FsListConfig = null;
  public messageQueueStates = {};
  public MessageQueueState = MessageQueueState;

  private _destroy$ = new Subject();

  constructor(
    @Inject(FS_APP_MESSAGE_CONFIG) private _config: FsAppMessageConfig,    
    private _dialog: MatDialog,
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
        query = {
          ...query,
          ...this.query,
          messageQueueAttachmentCounts: true,
          emailMessageQueues: true,
          emailMessageQueueBodies: false,
          smsMessageQueues: true,
        };

        return this._config.loadMessageQueues(query)
          .pipe(
            map(response => ({ data: response.data
              .map((messageQueue) => {              
                return {
                  ...messageQueue,
                  messageQueueRecipients: messageQueue.messageQueueRecipients
                  .reduce((accum, messageQueueRecipient) => {
                    accum[messageQueueRecipient.recipient] = messageQueueRecipient.state;

                    return accum;
                  }, {}),
                };
              }), paging: response.paging }))
          )
      }
    };

    // if any bulk actions add the selection object to config.
    if (this._config.cancelMessageQueues) {
      this.config.selection = {
        selectAll: false,
        actions: [
        ],
        actionSelected: (action: FsListActionSelected) => {
          return of(true)
            .pipe(
              switchMap(() => {
                if (action.action.name === 'cancel') {
                  return this._config.cancelMessageQueues(action);
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
    if (this._config.cancelMessageQueues) {
      this.config.selection.actions.push({
        type: SelectionActionType.Action,
        name: 'cancel',
        label: 'Cancel Queued',
      });
    }

    this.config.filters.push({
      name: 'message_id',
      type: ItemType.Select,
      label: 'Message Type',
      values: (query) => {
        return this._config.loadMessages(query)
          .pipe(
            map((items: any) => {
              return items.map((item) => ({ name: item.name, value: item.id }));
            })
          )
      }
    });
  }

  public open(messageQueue) {
    this._dialog.open(QueueComponent, {
      data: {
        messageQueue: messageQueue,
      },
      width: '85%'
    })
      .afterClosed()
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(() => {
        this.list.reload();
      });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
