import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
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
