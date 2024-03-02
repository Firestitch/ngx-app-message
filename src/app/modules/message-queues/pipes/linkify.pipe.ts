import { Pipe, PipeTransform } from '@angular/core';

import anchorme from 'anchorme';


@Pipe({name: 'linkify'})
export class LinkifyPipe implements PipeTransform {
  transform(input: string): string {
    return anchorme({
      input,
      options: {
        attributes: {
          target: "_blank",
        }
      }
    });
  }
}
