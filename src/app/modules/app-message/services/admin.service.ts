import { FsAppMessageConfig } from './../interfaces/app-message-config';
import { FS_APP_MESSAGE_CONFIG } from '../injectors/app-message-config.injector';
import { Injectable, Inject } from '@angular/core';
import * as _snakecaseKeys from 'snakecase-keys';
import * as _camelcaseKeys from 'camelcase-keys';
import { isArray } from 'lodash-es';

const snakecaseKeys = _snakecaseKeys;
const camelcaseKeys = _camelcaseKeys;

@Injectable()
export class AdminService {

  constructor(@Inject(FS_APP_MESSAGE_CONFIG) private _config: FsAppMessageConfig) {}

  public input(data) {
    if (isArray(data)) {
      return data.map(item => {
        return this._config.case === 'snake' ? camelcaseKeys(item, { deep: true }) : item;
      });
    } else {
      return this._config.case === 'snake' ? camelcaseKeys(data, { deep: true }) : data;
    }
  }

  public output(data) {
    if (isArray(data)) {
      return data.map(item => {
        return this._config.case === 'snake' ? snakecaseKeys(item) : item;
      });
    } else {
      return this._config.case === 'snake' ? snakecaseKeys(data) : data;
    }
  }
}
