import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { FS_APP_MESSAGE_CONFIG, FsAppMessageQueuesModule, FsAppMessageModule } from '@firestitch/package';
import { appMessageConfig } from './app/functions/app-message-config';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsTabsModule } from '@firestitch/tabs';
import { FsFileModule } from '@firestitch/file';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsLabelModule } from '@firestitch/label';
import { FsHtmlEditorModule } from '@firestitch/html-editor';
import { FsListModule } from '@firestitch/list';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsSelectionModule } from '@firestitch/selection';
import { FsScrollModule } from '@firestitch/scroll';
import { provideRouter, Routes } from '@angular/router';
import { ExamplesComponent } from './app/components';
import { FsTextEditorModule } from '@firestitch/text-editor';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FsAppMessageQueuesModule, FsAppMessageModule.forRoot(), FormsModule, FsTabsModule.forRoot(), FsFileModule.forRoot(), FsDatePickerModule.forRoot(), FsLabelModule, FsHtmlEditorModule.forRoot({
            activationKey: 'DUA2yE1G2E1A5B5B3pZGCTRSAPJWTLPLZHTQQe1JGZxC4B3A3C2B5A1C2E4F1A1==',
        }), FsListModule.forRoot(), FsExampleModule.forRoot(), FsMessageModule.forRoot(), FsSelectionModule, FsScrollModule.forRoot(), FsMessageModule.forRoot(), FsTextEditorModule.forRoot()),
        { provide: FS_APP_MESSAGE_CONFIG, useFactory: appMessageConfig, deps: [] },
        provideAnimations(),
        provideRouter(routes),
    ]
})
  .catch(err => console.error(err));

