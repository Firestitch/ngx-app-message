import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FsDateModule } from '@firestitch/date';
import { FsDialogModule } from '@firestitch/dialog';
import { FsFormModule } from '@firestitch/form';
import { FsIFrameModule } from '@firestitch/iframe';
import { FsLabelModule } from '@firestitch/label';
import { FsListModule } from '@firestitch/list';
import { FsMessageModule } from '@firestitch/message';
import { FsPromptInputModule } from '@firestitch/prompt';
import { FsSkeletonModule } from '@firestitch/skeleton';



import { QueueComponent } from './components/queue/queue.component';
import { QueuesComponent } from './components/queues/queues.component';
import { RecipientComponent } from './components/recipient/recipient.component';
import { LinkifyPipe } from './pipes/linkify.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FsMessageQueueService } from './services/message-queue.service';


@NgModule({
    imports: [
    RouterModule,
    FormsModule,
    CommonModule,
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
    FsFormModule,
    FsPromptInputModule,
    FsIFrameModule,
    FsMessageModule,
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
        FsMessageQueueService,
    ],
})
export class FsAppMessageQueuesModule { }
