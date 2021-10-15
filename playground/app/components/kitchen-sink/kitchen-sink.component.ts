import { Component } from '@angular/core';
import { KitchenSinkConfigureComponent } from '../kitchen-sink-configure';
import { FsExampleComponent } from '@firestitch/example';
import { FsMessage } from '@firestitch/message';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'kitchen-sink',
  templateUrl: 'kitchen-sink.component.html',
  styleUrls: ['kitchen-sink.component.scss']
})
export class KitchenSinkComponent {

  public config = {};
  public templateMessage = {"id":1,"content":' <div class = "body"><div class="content"> {$content} </div></div> ',"styles": ".body { padding: 20px } .content { background: #efefef; padding: 25px; border-radius: 10px; }", "name":"Default Template"};

  constructor(
    private exampleComponent: FsExampleComponent,
    private message: FsMessage
  ) {
    exampleComponent.setConfigureComponent(KitchenSinkConfigureComponent, { config: this.config });
  }

}
