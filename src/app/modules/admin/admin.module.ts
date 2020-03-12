import { AdminService } from './services/admin.service';
import { FS_ADMIN_CONFIG } from './injectors/admin-config.injector';
import { FsAdminConfig } from './interfaces/admin-config';
import { NgModule, ModuleWithProviders } from '@angular/core';


@NgModule({

})
export class FsAdminModule {
  static forRoot(config: FsAdminConfig): ModuleWithProviders {
    return {
      ngModule: FsAdminModule,
      providers: [
        { provide: FS_ADMIN_CONFIG, useValue: config || {} },
        AdminService
      ]
    };
  }
}
