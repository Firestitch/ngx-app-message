import {
  Component, OnInit, Inject, OnDestroy, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { FsMessage } from '@firestitch/message';
import { FsPrompt } from '@firestitch/prompt';
import { FsListComponent, FsListConfig } from '@firestitch/list';

import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import anchorme from 'anchorme';

import { EmailMessageQueueFormat, MessageQueueEventType } from '../../enums';
import { MessageQueueStates } from '../../consts';
import { indexNameValue } from '../../../../helpers';
import { MessageComponent } from '../../../../modules/messages/components';
import { MessageQueueType } from '../../enums';
import { FS_APP_MESSAGE_CONFIG } from '../../../app-message/injectors';
import { FsAppMessageConfig } from '../../../app-message/interfaces';
import { ResendMessageQueue, ForwardMessageQueue, LoadMessage } from '../../../app-message/types';
import { MessageQueueEventTypes } from '../../consts/message-queue-event-type.const';


@Component({
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueueComponent implements OnInit, OnDestroy {

  @ViewChild('logList')
  public logList: FsListComponent;

  public messageQueue;
  public loadMessage: LoadMessage;
  public resendMessageQueue: ResendMessageQueue;
  public forwardMessageQueue: ForwardMessageQueue;
  public messageQueueRecipients = {};
  public emailMessageQueueFormat = EmailMessageQueueFormat;
  public messageQueueStates;
  public logConfig: FsListConfig;
  public attachmentConfig: FsListConfig;
  public eventConfig: FsListConfig;
  public MessageQueueEventTypes = indexNameValue(MessageQueueEventTypes);
  public MessageQueueEventType = MessageQueueEventType;

  private _destroy$ = new Subject();

  constructor(
    @Inject(FS_APP_MESSAGE_CONFIG) private _config: FsAppMessageConfig,
    @Inject(MAT_DIALOG_DATA) private _data,
    private _message: FsMessage,
    private _prompt: FsPrompt,
    private _dialog: MatDialog,
    private _cdRef: ChangeDetectorRef,
  ) {
  }

  public ngOnInit() {
    this.messageQueueStates = indexNameValue(MessageQueueStates);
    this.resendMessageQueue = this._config.resendMessageQueue;
    this.forwardMessageQueue = this._config.forwardMessageQueue;

    this._config.loadMessageQueue(this._data.messageQueueId)
    .subscribe((messageQueue) => {
      this.messageQueue = messageQueue;

      if (this.messageQueue.emailMessageQueue) {
        let body = this.messageQueue.emailMessageQueue.body;
        if (this.messageQueue.emailMessageQueue.format === EmailMessageQueueFormat.HTML) {
          try {
            const doc = new DOMParser().parseFromString(body, 'text/html');

            doc.querySelectorAll('a').forEach((el) => {
              el.setAttribute('target', '_blank');
            });

            body = doc.documentElement.innerHTML;

          } catch (e) {
          }
        } else {
          body = this.anchorMe(body);
        }

        this.messageQueue.emailMessageQueue.body = body;
      }

      if (this.messageQueue.smsMessageQueue) {
        this.messageQueue.smsMessageQueue.body = this.anchorMe(this.messageQueue.smsMessageQueue.body);
      }

      this.messageQueueRecipients = this.messageQueue.messageQueueRecipients
        .reduce((accum, messageQueueRecipient) => {
          accum[messageQueueRecipient.recipient] = messageQueueRecipient.state;

          return accum;
        }, {});

      this._setLogsConfig(messageQueue);
      this._setAttachmentsConfig(messageQueue);
      this._setEventsConfig(messageQueue);
      this._cdRef.markForCheck();
    });
  }

  public anchorMe(html) {
    return anchorme(html, {
      options: {
        attributes: [
          {
            name: 'target',
            value: '_blank'
          },
        ],
      },
    });
  }

  public openMessage(message) {
    this._dialog.open(MessageComponent, {
      data: {
        message: message,
      },
      width: '85%'
    });
  }

  public resend() {
    this._prompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to resend this message?'
    }).subscribe(() => {
      this.resendMessageQueue(this.messageQueue)
      .subscribe(messageQueue => {
        Object.assign(this.messageQueue, messageQueue);
        this._cdRef.markForCheck();
        this._message.success('Successfully resent');

        if (this.logList) {
          this.logList.reload();
        }
      });
    });
  }

  public forward() {
    const typeName = this.messageQueue.type === MessageQueueType.Email ? 'an email' : 'a phone number';

    this._prompt.input({
      label: `Please enter ${typeName} to forward to`,
      title: 'Forward Message',
      commitLabel: 'Forward',
      required: true
    }).subscribe((value: string) => {
      if (value) {
        this.forwardMessageQueue(this.messageQueue, value)
        .subscribe(messageQueue => {
          this.messageQueue = {
            ...this.messageQueue,
            messageQueue,
          };
          this._message.success('Successfully forwarded');
          this._cdRef.markForCheck();
          
          if (this.logList) {
            this.logList.reload();
          }
        });
      }
    });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _setLogsConfig(messageQueue) {
    this.logConfig = {
      loadMore: true,
      queryParam: false,
      fetch: query => {
        return this._config.loadLogs(messageQueue, query);
      }
    }
  }

  private _setEventsConfig(messageQueue) {
    this.eventConfig = {
      loadMore: true,
      queryParam: false,
      fetch: (query) => {
        return this._config.loadMessageQueueEvents(messageQueue, query);
      }
    }
  }

  private _setAttachmentsConfig(messageQueue) {
    this.attachmentConfig = {
      queryParam: false,
      fetch: query => {
        return this._config.loadMessageQueueAttachments(messageQueue, query)
          .pipe(
            map(response => ({
              data: response.data.map(value => {
                value.prettyFilesize = this._prettyFilesize(value.filesize);
                return value;
              }), paging: response.paging
            }))
          );
      }
    };

    if (this._config.downloadMessageQueueAttachment) {
      this.attachmentConfig.rowActions = [
        {
          click: (messageAttachment) => {
            this._config.downloadMessageQueueAttachment(messageAttachment, this.messageQueue);
          },
          label: 'Download',
        }
      ];
    }
  }

  private _prettyFilesize(bytes) {
    if (bytes === 0) { return '0.00 B'; }
    const e = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B';
  }
}
