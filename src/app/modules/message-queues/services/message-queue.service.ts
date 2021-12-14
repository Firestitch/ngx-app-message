import { Injectable, OnDestroy } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { QueueComponent } from "../components/queue/queue.component";


@Injectable()
export class FsMessageQueueService implements OnDestroy {

  private _destroy$ = new Subject();
  
  public constructor(
    private _dialog: MatDialog,
  ) {}
  
  public openMessageQueue(messageQueueId: number, options: any = {}) {    
    return this._dialog.open(QueueComponent, {
      ...options,
      data: {
        messageQueueId,
      },
      width: options.width || '85%',
    }).afterClosed()
    .pipe(
      takeUntil(this._destroy$)
    );
  }
    
  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
