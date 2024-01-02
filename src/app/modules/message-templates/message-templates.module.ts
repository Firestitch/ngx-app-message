import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FsDialogModule } from '@firestitch/dialog';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FsListModule } from '@firestitch/list';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsTextEditorModule } from '@firestitch/text-editor';

import { FsAppMessagePreviewModule } from '../message-preview/message-preview.module';

import { TemplateComponent } from './components/template/template.component';
import { TemplatesComponent } from './components/templates/templates.component';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,

    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,

    FsListModule,
    FsDialogModule,
    FsLabelModule,
    FsSkeletonModule,
    FsFormModule,
    FsTextEditorModule,

    FsAppMessagePreviewModule,
  ],
  declarations: [
    TemplatesComponent,
    TemplateComponent,
  ],
  exports: [
    TemplatesComponent,
    TemplateComponent,
  ],
})
export class FsAppMessageTemplatesModule {
}
