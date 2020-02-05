import { NgModule } from '@angular/core';

import { FsListModule } from '@firestitch/list';
import { MatDialogModule, MatButtonModule, MatTabsModule, MatTooltipModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FsDialogModule } from '@firestitch/dialog';
import { FsLabelModule } from '@firestitch/label';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { TemplatesComponent } from './components/templates/templates.component';
import { TemplateComponent } from './components/template/template.component';



@NgModule({
  imports: [
    FsListModule,
    MatDialogModule,
    FsDialogModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    FsLabelModule,
    FlexLayoutModule,
    RouterModule,
    CommonModule,
    FsSkeletonModule,
    MatTooltipModule,
    FormsModule,
    FsFormModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    TemplatesComponent,
    TemplateComponent
  ],
  entryComponents: [
    TemplateComponent
  ],
  exports: [
    TemplatesComponent,
    TemplateComponent
  ]
})
export class FsAdminMessageTemplatesModule {
}
