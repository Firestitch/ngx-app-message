/*
 * Public API Surface of fs-menu
 */

export { FsAdminMessagesModule } from './app/modules/messages/admin-messages.module';
export { FsAdminMessageQueuesModule } from './app/modules/message-queues/admin-message-queues.module';
export { FsAdminMessageTemplatesModule } from './app/modules/message-templates/admin-message-templates.module';
export { FsAdminModule } from './app/modules/admin/admin.module';

export { MessagesComponent } from './app/modules/messages/components/messages/messages.component';
export { MessageComponent } from './app/modules/messages/components/message/message.component';
export { QueuesComponent } from './app/modules/message-queues/components/queues/queues.component';
export { QueueComponent } from './app/modules/message-queues/components/queue/queue.component';
export { TemplatesComponent } from './app/modules/message-templates/components/templates/templates.component';

export { FsAdminConfig } from './app/modules/admin/interfaces';

export { FS_ADMIN_CONFIG } from './app/modules/admin/injectors/admin-config.injector';
