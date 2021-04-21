import { FsAdminModule } from './../admin/admin.module';
import { NgModule } from '@angular/core';


import { FsListModule } from '@firestitch/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FsDialogModule } from '@firestitch/dialog';
import { FsLabelModule } from '@firestitch/label';
import { FsDateModule } from '@firestitch/date';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FsFormModule } from '@firestitch/form';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FormsModule } from '@angular/forms';
import { FsPromptInputModule } from '@firestitch/prompt';
import { FsAdminMessagesModule } from '../messages/admin-messages.module';
import { QueuesComponent } from './components/queues/queues.component';
import { QueueComponent } from './components/queue/queue.component';
import { LinkifyPipe } from './pipes/linkify.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';


@NgModule({
  imports: [
    FsListModule,
    MatDialogModule,
    FsDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    FsLabelModule,
    FsDateModule,
    FlexLayoutModule,
    RouterModule,
    CommonModule,
    FsSkeletonModule,
    MatTooltipModule,
    FsAdminMessagesModule,
    FormsModule,
    FsFormModule,
    FsPromptInputModule,
    FsAdminModule
  ],
  declarations: [
    QueuesComponent,
    QueueComponent,
    LinkifyPipe,
    TruncatePipe,
  ],
  exports: [
    QueuesComponent,
    QueueComponent,
  ]
})
export class FsAdminMessageQueuesModule {}
