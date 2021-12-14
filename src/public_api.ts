/*
 * Public API Surface of fs-menu
 */

export { FsAppMessagesModule } from './app/modules/messages/messages.module';
export { FsAppMessageQueuesModule } from './app/modules/message-queues/message-queues.module';
export { FsAppMessageTemplatesModule } from './app/modules/message-templates/message-templates.module';
export { FsAppMessageWebhooksModule } from './app/modules/webhooks/webhooks.module';
export { FsAppMessageModule } from './app/modules/app-message/app-message.module';

export { MessagesComponent } from './app/modules/messages/components/messages/messages.component';
export { MessageComponent } from './app/modules/messages/components/message/message.component';
export { QueuesComponent } from './app/modules/message-queues/components/queues/queues.component';
export { QueueComponent } from './app/modules/message-queues/components/queue/queue.component';
export { TemplatesComponent } from './app/modules/message-templates/components/templates/templates.component';

export { FsAppMessageConfig } from './app/modules/app-message/interfaces';

export { FsMessageQueueService } from './app/modules/message-queues/services/message-queue.service';

export { FS_APP_MESSAGE_CONFIG } from './app/modules/app-message/injectors/app-message-config.injector';
