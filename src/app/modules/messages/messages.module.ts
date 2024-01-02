import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FsCommonModule } from '@firestitch/common';
import { FsDialogModule } from '@firestitch/dialog';
import { FsFormModule } from '@firestitch/form';
import { FsHtmlEditorModule, FsHtmlRendererModule } from '@firestitch/html-editor';
import { FsLabelModule } from '@firestitch/label';
import { FsListModule } from '@firestitch/list';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsTabsModule } from '@firestitch/tabs';
import { FsTextEditorModule } from '@firestitch/text-editor';

import { FsAppMessagePreviewModule } from '../message-preview/message-preview.module';

import { AttachmentsComponent } from './components';
import { MessageComponent } from './components/message/message.component';
import { MessagesComponent } from './components/messages/messages.component';


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
    FsSkeletonModule,
    FsFormModule,
    FsTextEditorModule,
    FsHtmlEditorModule,
    FsHtmlRendererModule,
    FsCommonModule,
    FsTabsModule,

    FsAppMessagePreviewModule,
  ],
  declarations: [
    MessagesComponent,
    MessageComponent,
    AttachmentsComponent,
  ],
  exports: [
    MessagesComponent,
    MessageComponent,
  ],
})
export class FsAppMessagesModule {}
