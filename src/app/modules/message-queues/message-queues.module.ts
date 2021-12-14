import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FsListModule } from '@firestitch/list';
import { FsDialogModule } from '@firestitch/dialog';
import { FsLabelModule } from '@firestitch/label';
import { FsDateModule } from '@firestitch/date';
import { FsFormModule } from '@firestitch/form';
import { FsIFrameModule } from '@firestitch/iframe';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsPromptInputModule } from '@firestitch/prompt';

import { FsAppMessagesModule } from '../messages/messages.module';
import { QueuesComponent } from './components/queues/queues.component';
import { QueueComponent } from './components/queue/queue.component';
import { RecipientComponent } from './components/recipient/recipient.component';
import { LinkifyPipe } from './pipes/linkify.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FsMessageQueueService } from './services/message-queue.service';


@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,

    FlexLayoutModule,

    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,

    FsListModule,
    FsDialogModule,
    FsLabelModule,
    FsDateModule,
    FsSkeletonModule,
    FsAppMessagesModule,
    FsFormModule,
    FsPromptInputModule,
    FsIFrameModule,
  ],
  declarations: [
    QueuesComponent,
    QueueComponent,
    LinkifyPipe,
    TruncatePipe,
    RecipientComponent,
  ],
  exports: [
    QueuesComponent,
    QueueComponent,
  ],
  providers: [
    FsMessageQueueService
  ]
})
export class FsAppMessageQueuesModule {}
