import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';


import { Observable } from 'rxjs';

import { QueueComponent } from '../components/queue/queue.component';


@Injectable({
  providedIn: 'root',
})
export class FsMessageQueueService {

  constructor(
    private _dialog: MatDialog,
  ) { }

  public openMessageQueue(messageQueueId: number, options: any = {}): Observable<any> {
    return this._dialog.open(QueueComponent, {
      ...options,
      data: {
        messageQueueId,
      },
      width: options.width || '85%',
    })
      .afterClosed();
  }

}
