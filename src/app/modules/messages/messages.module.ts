import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FsLabelModule } from '@firestitch/label';
import { FsDialogModule } from '@firestitch/dialog';
import { FsListModule } from '@firestitch/list';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsTextEditorModule } from '@firestitch/text-editor';
// import { FsEditorRichTextModule } from '@firestitch/editor';

import { MessagesComponent } from './components/messages/messages.component';
import { MessageComponent } from './components/message/message.component';
import { FsAppMessagePreviewModule } from '../message-preview/message-preview.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,

    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,

    FsDialogModule,
    FsListModule,
    FsLabelModule,
    FlexLayoutModule,
    FsSkeletonModule,
    FsFormModule,
    FsTextEditorModule,
    // FsEditorRichTextModule,

    FsAppMessagePreviewModule,
  ],
  declarations: [
    MessagesComponent,
    MessageComponent,
  ],
  exports: [
    MessagesComponent,
    MessageComponent,
  ],
})
export class FsAppMessagesModule {}
