import { FsAdminModule } from './../admin/admin.module';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FsLabelModule } from '@firestitch/label';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FsDialogModule } from '@firestitch/dialog';
import { FsListModule } from '@firestitch/list';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsEditorRichTextModule } from '@firestitch/editor';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageComponent } from './components/message/message.component';


@NgModule({
  imports: [
    FsListModule,
    MatDialogModule,
    FsDialogModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FsLabelModule,
    FlexLayoutModule,
    MatOptionModule,
    MatSelectModule,
    RouterModule,
    CommonModule,
    FsSkeletonModule,
    MatTooltipModule,
    FormsModule,
    FsFormModule,
    FsEditorRichTextModule,
    FsAdminModule
  ],
  declarations: [
    MessagesComponent,
    MessageComponent
  ],
  entryComponents: [
    MessageComponent
  ],
  exports: [
    MessagesComponent,
    MessageComponent
  ]
})
export class FsAdminMessagesModule {}
