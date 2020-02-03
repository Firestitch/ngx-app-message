import { NgModule } from '@angular/core';

import {
  MessagesComponent,
  MessageComponent,
} from '.';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FsLabelModule } from '@firestitch/label';
import { MatTabsModule, MatButtonModule, MatDialogModule,
         MatTooltipModule, MatFormFieldModule, MatOptionModule,
         MatSelectModule, MatInputModule } from '@angular/material';
import { FsDialogModule } from '@firestitch/dialog';
import { FsListModule } from '@firestitch/list';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsEditorRichTextModule } from '@firestitch/editor';


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
    FsEditorRichTextModule
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
