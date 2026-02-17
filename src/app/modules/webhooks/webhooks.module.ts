import { NgModule } from '@angular/core';

import { WebhooksComponent } from './components/webhooks/webhooks.component';

@NgModule({
  imports: [WebhooksComponent],
  exports: [WebhooksComponent],
})
export class FsAppMessageWebhooksModule {}
