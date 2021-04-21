import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject, fromEvent } from 'rxjs';


@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
})
export class IFrameComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('frame')
  public frame: ElementRef;

  @Input() public html;
  @Input() public styles;

  private _destroy$ = new Subject();

  public ngOnInit() {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(50),
        takeUntil(this._destroy$)
      )
      .subscribe(() => {
        this._updateBodyFrameHeight();
      });
  }

  public get frameEl() {
    return this.frame.nativeElement;
  }

  public ngAfterViewInit() {
    this._updateBodyFrames();
  }

  private _updateBodyFrames() {
    const win: Window = this.frameEl.contentWindow;
    const doc: Document = win.document;
    const data = `
    <style>
      body {
        font-family: Roboto;
        font-size: 15px;
        margin: 0 !important;
        overflow-y: hidden !important;
        width: auto !important;
      }

      a {
        color: #1155CC;
      }

      * {
        box-sizing: border-box !important;
      }

      ${this.styles}
    </style>
    ${this.html}`;

    this.frameEl.onload = () => {
      this._updateBodyFrameHeight();
    }

    doc.open();
    doc.write(data);
    doc.close();

    // const styles = doc.createElement('style');
    // const css = `
    //             body {
    //               font-family: Roboto;
    //               font-size: 15px;
    //               margin: 0 !important;
    //               overflow-y: hidden !important;
    //               width: auto !important;
    //             }

    //             a {
    //               color: #1155CC;
    //             }`;

    // styles.appendChild(document.createTextNode(css));
    //doc.body.appendChild(styles);
  //});
  }


  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _updateBodyFrameHeight() {
    this.frameEl.removeAttribute('height');
    this.frameEl.setAttribute('height', this.frameEl.contentDocument.body.scrollHeight);
  }

}
