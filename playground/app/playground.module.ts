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
import { FsEditorRichTextModule } from '@firestitch/editor';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { fsAppMessageConfig } from './functions/fs-app-message-config';

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
    FsAppMessageModule.forRoot(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsLabelModule,
    FsListModule.forRoot(),
    FsExampleModule.forRoot(),
    FsEditorRichTextModule.forRoot(),
    FsMessageModule.forRoot(),
    FsSelectionModule.forRoot(),
    FsScrollModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    RouterModule.forRoot(routes),
    MonacoEditorModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    KitchenSinkComponent,
    KitchenSinkConfigureComponent
  ],
  providers: [    
    { provide: FS_APP_MESSAGE_CONFIG, useFactory: fsAppMessageConfig, deps: [] }
  ]
})
export class PlaygroundModule {
}
