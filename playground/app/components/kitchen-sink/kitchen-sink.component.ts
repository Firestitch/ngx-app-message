import { Component } from '@angular/core';
import { MessageQueueType } from 'src/app/modules/message-queues/enums';
import { QueuesComponent } from '../../../../src/app/modules/message-queues/components/queues/queues.component';
import { MessagesComponent } from '../../../../src/app/modules/messages/components/messages/messages.component';
import { TemplatesComponent } from '../../../../src/app/modules/message-templates/components/templates/templates.component';
import { WebhooksComponent } from '../../../../src/app/modules/webhooks/components/webhooks/webhooks.component';

@Component({
    selector: 'kitchen-sink',
    templateUrl: 'kitchen-sink.component.html',
    styleUrls: ['kitchen-sink.component.scss'],
    standalone: true,
    imports: [
        QueuesComponent,
        MessagesComponent,
        TemplatesComponent,
        WebhooksComponent,
    ],
})
export class KitchenSinkComponent {

  public config = {};
  public templateMessage = { "id": 1, "content": ' <div class = "body"><div class="content"> {$content} </div></div> ', "styles": ".body { padding: 20px } .content { background: #efefef; padding: 25px; border-radius: 10px; }", "name": "Default Template" };

  public MessageQueueType = MessageQueueType;
}
