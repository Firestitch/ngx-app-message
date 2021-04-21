import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { FsDialogModule } from '@firestitch/dialog';
import { PreviewComponent } from './components/preview';

import { IFrameComponent } from './components/iframe';


@NgModule({
  imports: [
    MatDialogModule,
    MatButtonModule,

    FsDialogModule,
  ],
  declarations: [
    PreviewComponent,
    IFrameComponent,
  ],
  exports: [
    PreviewComponent,
    IFrameComponent,
  ]
})
export class FsAdminMessagePreviewModule {
}
