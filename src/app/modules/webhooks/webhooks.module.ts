import { NgModule } from '@angular/core';
import { FsDateModule } from '@firestitch/date';

import { FsListModule } from '@firestitch/list';

import { WebhooksComponent } from './components/webhooks/webhooks.component';

@NgModule({
  imports: [
    FsListModule,

    FsDateModule,
  ],
  declarations: [
    WebhooksComponent,
  ],
  exports: [
    WebhooksComponent,
  ],
})
export class FsAppMessageWebhooksModule {}
