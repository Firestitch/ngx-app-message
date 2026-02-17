import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { TemplateComponent } from './components/template/template.component';
import { TemplatesComponent } from './components/templates/templates.component';

@NgModule({
  imports: [MatDialogModule, TemplatesComponent, TemplateComponent],
  exports: [TemplatesComponent, TemplateComponent],
})
export class FsAppMessageTemplatesModule {}
