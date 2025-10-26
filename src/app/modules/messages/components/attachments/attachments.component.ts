import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy, Input, inject } from '@angular/core';

import { FsFile } from '@firestitch/file';

import { FsListComponent, FsListConfig, FsListModule } from '@firestitch/list';
import { ActionMode } from '@firestitch/filter';

import { Subject } from 'rxjs';

import { FS_APP_MESSAGE_CONFIG } from '../../../app-message/injectors';
import { FsAppMessageConfig } from '../../../app-message/interfaces';
import { FsMessage } from '@firestitch/message';
import { FsCommonModule } from '@firestitch/common';


@Component({
    selector: 'fs-app-message-attachments',
    templateUrl: './attachments.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FsListModule, FsCommonModule],
})
export class AttachmentsComponent implements OnInit, OnDestroy {
  private _config = inject<FsAppMessageConfig>(FS_APP_MESSAGE_CONFIG);
  private _message = inject(FsMessage);


  @ViewChild(FsListComponent, { static: true }) 
  public list: FsListComponent = null;

  @Input() public message;

  public config: FsListConfig = null;

  private _destroy$ = new Subject();

  public ngOnInit(): void {
    this.config = {
      rowActions: [],
      actions: [
        {
          label: 'Upload',
          mode: ActionMode.File,
          select: (fsFile: FsFile) => {
            this._config.uploadMessageAttachment(this.message, fsFile)
            .subscribe(() => {
              this._message.success('Saved attachment');
              this.list.reload();
            });
          }
        }
      ],
      fetch: query => {
        return this._config.loadMessageAttachments(this.message, query);
      }
    }

    if (this._config.downloadMessageAttachment) {
      this.config.rowActions
        .push(
          {
            click: data => {
              return this._config.downloadMessageAttachment(data);
            },
            label: 'Download',
          },
        );
    }

    if (this._config.deleteMessageAttachment) {
      this.config.rowActions
        .push(
          {
            click: data => {
              return this._config.deleteMessageAttachment(data);
            },
            remove: {
              title: 'Confirm',
              template: 'Are you sure you would like to delete this template?',
            },
            label: 'Delete',
          },
        );
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

}
