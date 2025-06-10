import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsExampleModule } from '@firestitch/example';
import { FsFileModule } from '@firestitch/file';
import { FsHtmlEditorModule } from '@firestitch/html-editor';
import { FsLabelModule } from '@firestitch/label';
import { FsListModule } from '@firestitch/list';
import { FsMessageModule } from '@firestitch/message';
import {
  FS_APP_MESSAGE_CONFIG,
  FsAppMessageModule,
  FsAppMessageQueuesModule,
  FsAppMessageTemplatesModule,
  FsAppMessagesModule,
} from '@firestitch/package';
import { FsScrollModule } from '@firestitch/scroll';
import { FsSelectionModule } from '@firestitch/selection';
import { FsTabsModule } from '@firestitch/tabs';
import { FsTextEditorModule } from '@firestitch/text-editor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FsAppMessageWebhooksModule } from 'src/app/modules/webhooks/webhooks.module';

import { AppComponent } from './app.component';
import {
  ExamplesComponent,
  KitchenSinkComponent,
} from './components';
import { KitchenSinkConfigureComponent } from './components/kitchen-sink-configure';
import { appMessageConfig } from './functions/app-message-config';
import { AppMaterialModule } from './material.module';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FsAppMessageQueuesModule,
    FsAppMessageTemplatesModule,
    FsAppMessagesModule,
    FsAppMessageWebhooksModule,
    FsAppMessageModule.forRoot(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsTabsModule.forRoot(),
    FsFileModule.forRoot(),
    FsDatePickerModule.forRoot(),
    FsLabelModule,
    FsHtmlEditorModule.forRoot({
      activationKey: 'DUA2yE1G2E1A5B5B3pZGCTRSAPJWTLPLZHTQQe1JGZxC4B3A3C2B5A1C2E4F1A1==',
    }),
    FsListModule.forRoot(),
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    FsSelectionModule,
    FsScrollModule.forRoot(),
    FsMessageModule.forRoot(),
    RouterModule.forRoot(routes, {}),
    FsTextEditorModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    KitchenSinkComponent,
    KitchenSinkConfigureComponent,
  ],
  providers: [
    { provide: FS_APP_MESSAGE_CONFIG, useFactory: appMessageConfig, deps: [] },
  ],
})
export class PlaygroundModule {
}
