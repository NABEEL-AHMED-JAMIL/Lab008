import { Component, OnInit } from '@angular/core';
//----------------Service------------------------------
import { AlertService } from '../services/alert.service';
//-------------Routing---------------------------------
//-------------Model----------------------------------
//-------------Module----------------------------------
//------------Component--------------------------------


@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html'
})


export class AlertComponent {
    // this message show the alert for log_in (true: message => login Success , false: message => login Fail);
    public message: any;
    
    constructor(private alertService: AlertService) { }
     
    ngOnInit() {
        this.alertService.getMessage().
            subscribe(message => { 
                this.message = message;
            });
    }

}