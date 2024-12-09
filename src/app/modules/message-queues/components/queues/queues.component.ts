import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';


import { ItemType } from '@firestitch/filter';
import { FsListActionSelected, FsListComponent, FsListConfig, PaginationStrategy } from '@firestitch/list';
import { SelectionActionType } from '@firestitch/selection';
import { FsStore } from '@firestitch/store';

import { Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';

import { isAfter } from 'date-fns';

import { indexNameValue } from '../../../../helpers';
import { FS_APP_MESSAGE_CONFIG } from '../../../app-message/injectors';
import { FsAppMessageConfig } from '../../../app-message/interfaces';
import { MessageQueueStates } from '../../consts';
import { MessageQueueType } from '../../enums';
import { MessageQueueState } from '../../enums/message-queue-state.enum';
import { FsMessageQueueService } from '../../services/message-queue.service';


@Component({
  selector: 'fs-app-message-queues',
  styleUrls: ['./queues.component.scss'],
  templateUrl: './queues.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueuesComponent implements OnInit, OnDestroy {

  @ViewChild(FsListComponent, { static: true })
  public list: FsListComponent = null;

  @Input() public query = {};

  @Input() public type: MessageQueueType = null;

  public config: FsListConfig = null;
  public messageQueueStates = {};
  public MessageQueueState = MessageQueueState;
  public webHookEnabled;

  private _destroy$ = new Subject();

  constructor(
    @Inject(FS_APP_MESSAGE_CONFIG) private _config: FsAppMessageConfig,
    private _messageQueueService: FsMessageQueueService,
    private _cdRef: ChangeDetectorRef,
    private _store: FsStore,
  ) { }

  public ngOnInit() {
    this.messageQueueStates = indexNameValue(MessageQueueStates);
    this.initList();
    this.initWebhook();
  }

  public enableWebhook() {
    this._config.createWebhook()
      .subscribe(() => {
        this.initWebhook();
      });
  }

  public initWebhook() {
    const domain = document.location.hostname;

    if(domain === 'localhost' || domain === '[::1]') {
      return;
    }

    this._config.loadWebhooks({ domain })
      .pipe(
        filter(() => {
          return !this._store.get('messagesWebhookEnabled');
        }),
      )
      .subscribe((webhooks) => {
        this._cdRef.markForCheck();
        this.webHookEnabled = webhooks
          .some((webhook) => {
            const url = new URL(webhook.url);

            return url.host === domain;
          });

        this._store.set('messagesWebhookEnabled', this.webHookEnabled);
      });
  }

  public initList() {
    this.config = {
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search',
        },
        {
          name: 'state',
          type: ItemType.Select,
          label: 'Status',
          values: () => {
            return MessageQueueStates;
          },
        },
        {
          name: 'date',
          type: ItemType.DateRange,
          label: ['From Date', 'To Date'],
        },
      ],
      paging: {
        strategy: PaginationStrategy.Many,
      },
      sort: { value: 'created_date', direction: 'desc' },
      fetch: (query) => {
        query = {
          ...query,
          ...this.query,
          type: this.type,
          messageQueueAttachmentCounts: true,
          emailMessageQueues: true,
          emailMessageQueueBodies: false,
          smsMessageQueues: true,
        };

        return this._config.loadMessageQueues(query)
          .pipe(
            map((response) => ({
              data: response.data
                .map((messageQueue) => {
                  return {
                    ...messageQueue,
                    scheduled: messageQueue.state === MessageQueueState.Queued && isAfter(messageQueue.scheduledDate, new Date()),
                    messageQueueRecipients: messageQueue.messageQueueRecipients
                      .reduce((accum, messageQueueRecipient) => {
                        accum[messageQueueRecipient.recipient] = messageQueueRecipient.state;

                        return accum;
                      }, {}),
                  };
                }), paging: response.paging,
            })),
          );
      },
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
        },
      };
    }

    this.config.filters.push({
      name: 'messageId',
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
                { value: null, name: 'All' },
                ...response.data
                  .map((item) => ({ name: item.name, value: item.id })),
              ];
            }),
          );
      },
    } as any);
  }

  public open(messageQueue) {
    this._messageQueueService.openMessageQueue(messageQueue.id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.list.reload();
      });
  }

  public ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
