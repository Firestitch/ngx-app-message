import {
  ChangeDetectionStrategy,
  Component, Input, OnInit,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';



@Component({
    selector: 'app-recipient',
    templateUrl: './recipient.component.html',
    styleUrls: ['./recipient.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatIcon, MatTooltip],
})
export class RecipientComponent implements OnInit {
  
  @Input() name;
  @Input() state;
  
  public icon;

  public ngOnInit(): void {
    
    const icons = {
      'S': { name: 'check_circle', tooltip: 'Sent' },
      'E': { name: 'offline_bolt', tooltip: 'Sending' },
      'F': { name: 'info', tooltip: 'Failed' },
    }

    this.icon = icons[this.state];
  }

}
