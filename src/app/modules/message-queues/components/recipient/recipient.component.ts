import {
  ChangeDetectionStrategy,
  Component, Input, OnInit,
} from '@angular/core';



@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
