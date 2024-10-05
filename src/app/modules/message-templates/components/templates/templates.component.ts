import { Component, OnDestroy, OnInit, ViewChild, Inject } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { FsListComponent, FsListConfig } from '@firestitch/list';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { TemplateComponent } from '../template';
import { FS_APP_MESSAGE_CONFIG } from '../../../app-message/injectors';
import { FsAppMessageConfig } from '../../../app-message/interfaces';


@Component({
  selector: 'fs-app-message-templates',
  templateUrl: './templates.component.html'
})
export class TemplatesComponent implements OnInit, OnDestroy {

  @ViewChild(FsListComponent, { static: true }) 
  public list: FsListComponent = null;

  public config: FsListConfig = null;
  public messageQueueStates = [];

  private _destroy$ = new Subject();

  constructor(
    @Inject(FS_APP_MESSAGE_CONFIG) private _config: FsAppMessageConfig,
    private _dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
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
        return this._config.loadMessageTemplates(query);
      }
    }

    if (this._config.deleteMessageTemplate) {
      this.config.rowActions = [
        {
          click: data => {
            return this._config.deleteMessageTemplate(data);
          },
          remove: {
            title: 'Confirm',
            template: 'Are you sure you would like to delete this template?',
          },
          menu: true,
          label: 'Delete',
        },
      ];
    }
  }

  public open(messageTemplate): void {
    const dialogRef = this._dialog.open(TemplateComponent, {
      data: {
        messageTemplate,
      },
      width: '85%',
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.list.reload();
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

}
