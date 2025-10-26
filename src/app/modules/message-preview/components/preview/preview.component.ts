import { Component, OnInit, inject } from '@angular/core';

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
  private _data = inject(MAT_DIALOG_DATA);


  public html;
  public styles;

  constructor() {
    const _data = this._data;

    this.html = _data.html;
    this.styles = _data.styles;
  }

  public ngOnInit() {

  }
}
