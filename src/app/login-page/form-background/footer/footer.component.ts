import { Component, Input } from '@angular/core';
import { APPCONFIG } from '../../../config';
import { Account } from '../../../model/dAccount';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent {

  @Input()
  private account: any;

  constructor() {
    if (!this.account) {
      this.account = new Account();
    } else {
      this.account = APPCONFIG;
    }
  }

}