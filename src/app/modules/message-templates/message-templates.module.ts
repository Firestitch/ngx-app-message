import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FsListModule } from '@firestitch/list';
import { FsDialogModule } from '@firestitch/dialog';
import { FsLabelModule } from '@firestitch/label';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsFormModule } from '@firestitch/form';
import { FsTextEditorModule } from '@firestitch/text-editor';

import { TemplatesComponent } from './components/templates/templates.component';
import { TemplateComponent } from './components/template/template.component';

import { FsAppMessagePreviewModule } from '../message-preview/message-preview.module';


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
    FlexLayoutModule,
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
