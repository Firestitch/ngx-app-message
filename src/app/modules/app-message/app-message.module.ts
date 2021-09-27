import { NgModule, ModuleWithProviders } from '@angular/core';


@NgModule({
})
export class FsAppMessageModule {
  static forRoot(): ModuleWithProviders<FsAppMessageModule> {
    return {
      ngModule: FsAppMessageModule,
    };
  }
}
