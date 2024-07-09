import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';

import { FsListComponent, FsListConfig } from '@firestitch/list';
import { FsMessage } from '@firestitch/message';

import { map } from 'rxjs/operators';

import { FS_APP_MESSAGE_CONFIG } from '../../../app-message/injectors';
import { FsAppMessageConfig } from '../../../app-message/interfaces';


@Component({
  selector: 'fs-app-message-webhooks',
  templateUrl: './webhooks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebhooksComponent implements OnInit {

  @ViewChild(FsListComponent)
  public list: FsListComponent;

  public listConfig: FsListConfig;

  constructor(
    @Inject(FS_APP_MESSAGE_CONFIG) private _config: FsAppMessageConfig,
    private _message: FsMessage,
  ) {}

  public ngOnInit(): void {
    this.listConfig = {
      paging: false,
      actions: [
        {
          click: () => {
            this._config.createWebhook()
              .subscribe(() => {
                this._message.success('Created webhook');
                this.list.reload();
              });
          },
          label: 'Create',
        },
      ],
      rowActions: [
        {
          click: (webhook) => {
            this._config.deleteWebhook(webhook)
              .subscribe(() => {
                this._message.success('Deleted webhook');
                this.list.reload();
              });
          },
          label: 'Delete',
        },
      ],
      fetch: () => {
        return this._config.loadWebhooks({
          domain: window.location.hostname,
        })
          .pipe(
            map((webhooks) => ({ data: webhooks })),
          );
      },
    };
  }
}
