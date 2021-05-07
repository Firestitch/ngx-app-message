import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { FsIFrameModule } from '@firestitch/iframe';
import { FsDialogModule } from '@firestitch/dialog';

import { PreviewComponent } from './components/preview';


@NgModule({
  imports: [
    MatDialogModule,
    MatButtonModule,

    FsDialogModule,
    FsIFrameModule,
  ],
  declarations: [
    PreviewComponent,
  ],
  exports: [
    PreviewComponent,
  ]
})
export class FsAdminMessagePreviewModule {
}
