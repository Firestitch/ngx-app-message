import { FsAdminConfig } from './../interfaces/admin-config';
import { FS_ADMIN_CONFIG } from '../injectors/admin-config.injector';
import { Injectable, Inject } from '@angular/core';
import * as _snakecaseKeys from 'snakecase-keys';
import * as _camelcaseKeys from 'camelcase-keys';
import { isArray } from 'lodash-es';

const snakecaseKeys = _snakecaseKeys;
const camelcaseKeys = _camelcaseKeys;

@Injectable()
export class AdminService {

  constructor(@Inject(FS_ADMIN_CONFIG) private _config: FsAdminConfig) {}

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
