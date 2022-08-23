import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import {
  FsAppMessageQueuesModule,
  FsAppMessageTemplatesModule,
  FsAppMessagesModule, FsAppMessageModule, FS_APP_MESSAGE_CONFIG
} from '@firestitch/package';
import { FsLabelModule } from '@firestitch/label';
import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';
import {
  KitchenSinkComponent,
  ExamplesComponent
} from './components';
import { AppComponent } from './app.component';
import { KitchenSinkConfigureComponent } from './components/kitchen-sink-configure';
import { FsListModule } from '@firestitch/list';
import { FsScrollModule } from '@firestitch/scroll';
import { FsSelectionModule } from '@firestitch/selection';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { appMessageConfig } from './functions/app-message-config';
import { FsAppMessageWebhooksModule } from 'src/app/modules/webhooks/webhooks.module';
import { FsHtmlEditorModule } from '@firestitch/html-editor';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [ AppComponent ],
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
    FsLabelModule,
    FsHtmlEditorModule.forRoot({
      activationKey: 'DUA2yE1G2E1A5B5B3pZGCTRSAPJWTLPLZHTQQe1JGZxC4B3A3C2B5A1C2E4F1A1==',
    }),
    FsListModule.forRoot(),
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    FsSelectionModule,
    FsScrollModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    MonacoEditorModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    KitchenSinkComponent,
    KitchenSinkConfigureComponent
  ],
  providers: [
    { provide: FS_APP_MESSAGE_CONFIG, useFactory: appMessageConfig, deps: [] }
  ]
})
export class PlaygroundModule {
}
