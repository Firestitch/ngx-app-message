import { Pipe, PipeTransform } from '@angular/core';

import anchorme from 'anchorme';


@Pipe({name: 'linkify'})
export class LinkifyPipe implements PipeTransform {
  transform(value: string): string {
    return anchorme(value, {
      attributes: [
        {
          name: 'target',
          value: '_blank'
        },
      ]
    });
  }
}
