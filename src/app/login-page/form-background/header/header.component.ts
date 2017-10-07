import { Component, Input } from '@angular/core';
import { APPCONFIG } from '../../../config';
import { Account } from '../../../model/dAccount';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})

export class HeaderComponent  {

  @Input()
  private account:any;
  
  constructor() {
    if(!this.account){
      this.account = new Account();
    }else {
      this.account = APPCONFIG;
    }

   }




}