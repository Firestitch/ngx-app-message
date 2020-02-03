import { Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';

import { takeUntil, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { FsListComponent, FsListConfig } from '@firestitch/list';

import { MatDialog } from '@angular/material/dialog';
import { map as _map } from 'lodash-es';
import { TemplateComponent } from '../template';


@Component({
  selector: 'fs-admin-message-templates',
  templateUrl: './templates.component.html'
})
export class TemplatesComponent implements OnInit, OnDestroy {

  @Input() loadMessageTemplates: (query: any) => Observable<{ data: any[], paging: any }>;
  @Input() loadMessageTemplate: (messageTemplate) => Observable<any[]>;
  @Input() saveMessageTemplate: (messageTemplate) => Observable<any[]>;

  @ViewChild('list', { static: true }) public list: FsListComponent = null;
  public config: FsListConfig = null;
  public messageQueueStates = [];

  private _destroy$ = new Subject();

  constructor(
    private _dialog: MatDialog
  ) { }

  public ngOnInit() {

    this.config = {
      actions: [
        {
          label: 'Create',
          click: () => {
            this.open({});
          }
        }
      ],
      status: false,
      fetch: query => {
      return this.loadMessageTemplates(query);
      }
    }
  }

  public open(message_template) {
    const dialogRef = this._dialog.open(TemplateComponent, {
      data: {
        message_template: message_template,
        loadMessageTemplate: this.loadMessageTemplate,
        saveMessageTemplate: this.saveMessageTemplate,
      },
      width: '85%'
    });

    dialogRef.afterClosed()
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe((response) => {
      if (response) {
        this.list.updateData(
          response,
          (row: any) => {
            return row.id === response.id;
          });
      }
    })
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
