import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { MessageComponent } from './components/message/message.component';
import { MessagesComponent } from './components/messages/messages.component';

@NgModule({
  imports: [MatDialogModule, MessagesComponent, MessageComponent],
  exports: [MessagesComponent, MessageComponent],
})
export class FsAppMessagesModule {}
