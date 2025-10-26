import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from '@angular/core';

import { FsListComponent, FsListConfig, FsListModule } from '@firestitch/list';
import { FsMessage } from '@firestitch/message';

import { map } from 'rxjs/operators';

import { FS_APP_MESSAGE_CONFIG } from '../../../app-message/injectors';
import { FsAppMessageConfig } from '../../../app-message/interfaces';
import { FsDateModule } from '@firestitch/date';


@Component({
    selector: 'fs-app-message-webhooks',
    templateUrl: './webhooks.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FsListModule, FsDateModule],
})
export class WebhooksComponent implements OnInit {
  private _config = inject<FsAppMessageConfig>(FS_APP_MESSAGE_CONFIG);
  private _message = inject(FsMessage);


  @ViewChild(FsListComponent)
  public list: FsListComponent;

  public listConfig: FsListConfig;

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
