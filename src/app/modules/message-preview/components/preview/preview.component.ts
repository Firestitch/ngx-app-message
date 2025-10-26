import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FsDialogModule } from '@firestitch/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { FsIFrameModule } from '@firestitch/iframe';
import { MatButton } from '@angular/material/button';


@Component({
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss'],
    standalone: true,
    imports: [FsDialogModule, MatDialogTitle, CdkScrollable, MatDialogContent, FsIFrameModule, MatDialogActions, MatButton, MatDialogClose]
})
export class PreviewComponent implements OnInit {

  public html;
  public styles;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data,
  ) {
    this.html = _data.html;
    this.styles = _data.styles;
  }

  public ngOnInit() {

  }
}
