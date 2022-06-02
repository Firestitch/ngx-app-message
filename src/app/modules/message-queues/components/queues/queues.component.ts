import { Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { takeUntil, map, switchMap, tap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';

import { FsListActionSelected, FsListComponent, FsListConfig } from '@firestitch/list';
import { ItemType } from '@firestitch/filter';
import { SelectionActionType } from '@firestitch/selection';

import { MessageQueueStates } from '../../consts';
import { indexNameValue } from '../../../../helpers';
import { MessageQueueState } from '../../enums/message-queue-state.enum';
import { FS_APP_MESSAGE_CONFIG } from '../../../app-message/injectors';
import { FsAppMessageConfig } from '../../../app-message/interfaces';
import { FsMessageQueueService } from '../../services/message-queue.service';


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
    private _messageQueueService: FsMessageQueueService,
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

    if (this._config.bulkMessageQueues) {
      this.config.selection = {
        selectAll: false,
        actions: [
          {
            type: SelectionActionType.Action,
            name: 'queue',
            label: 'Queue',
          },
          {
            type: SelectionActionType.Action,
            name: 'resend',
            label: 'Resend',
          },
          {
            type: SelectionActionType.Action,
            name: 'cancel',
            label: 'Cancel',
          },
        ],
        actionSelected: (actionSelected: FsListActionSelected) => {
          return this._config.bulkMessageQueues(actionSelected.action.name, actionSelected.selected)
            .pipe(
              tap(() => {
                this.list.reload();
              }),
            );
        }
      };
    }

    this.config.filters.push({
      name: 'message_id',
      type: ItemType.Select,
      label: 'Message Type',
      values: (query) => {
        query = { 
          ...query,
          limit: 50,
        };

        return this._config.loadMessages(query)
          .pipe(
            map((response) => {
              return [
                { value: null, name: 'All', },
                ...response.data.map((item) => ({ name: item.name, value: item.id })),
              ];
            })
          )
      }
    });
  }

  public open(messageQueue) {
    this._messageQueueService.openMessageQueue(messageQueue.id)
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
