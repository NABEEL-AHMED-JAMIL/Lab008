import { Component, Input } from '@angular/core';
import { APPCONFIG } from '../../config';
import { DUserEndpointService } from '../../services/duser.endpoint.service';
import { Duser } from '../../model/duser.model';
import { Account } from '../../model/dAccount';
import { DApiAuthToken } from '../../model/dApiAuthToken';
import { UtilService } from '../../services/util.service';
import { AuthGuard } from '../../services/auth-guard.service';
import { MdSnackBar, MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmDialog } from '../../confirm-dialog/confirmDialog.component';
import { Message } from '../../shared/messages';
import { ObjectStorage } from '../../model/objectStorage';
import { Observable, Observer } from 'rxjs/Rx';
@Component({
    selector: 'my-app-header',
    styles: [],
    templateUrl: './header.component.html'
})

export class AppHeaderComponent {
    public appConfig: any;
    public dUser: Duser;
    private dAccount: Account;
    public profilePic: String = 'http://www.mango.org/Mangos/media/Media/Images/Header%20Images/facts.jpg';
    private message: Message;
    public logoImage: String;
    private objectStorage: ObjectStorage;


    constructor(private utilService: UtilService, private dialog: MdDialog, private router: Router, private userService: DUserEndpointService) {
        this.objectStorage = ObjectStorage.getInstance();
        if (!this.objectStorage.getUser_session().code) {
            this.message = new Message();
            this.appConfig = APPCONFIG;
            this.dUser = this.objectStorage.getUser_session();
            this.dAccount = this.dUser["account"];
            this.profilePic = (this.dUser['profilePic'] != null ? this.dUser['profilePic'] : this.profilePic);
            this.utilService.firmChangeEmiited$.subscribe( logo =>{ 
                this.logoImage = logo != null ? logo : this.appConfig.firmLogoCB 
            });
            //this.logoImage = (this.utilService.getfirmLogoCB() != null ? this.utilService.getfirmLogoCB() : this.appConfig.firmLogoCB);
        } else {
            this.objectStorage.clearStorage();
            this.router.navigate(["\login"]);

        }

    }

    public onSignout(): void {
        let dlg = this.dialog.open(ConfirmDialog);
        dlg.componentInstance.title = this.message.signoutTitle;
        dlg.componentInstance.content = this.message.signout;
        dlg.componentInstance.proceedButtonTitle = this.message.yes;
        dlg.componentInstance.cancelButtonTitle = this.message.no;
        dlg.afterClosed().subscribe((result) => {
            if (result == 'PROCEED') {
                window.location.reload();
                // ok go with the id
                this.router.navigate(['/login', this.objectStorage.getAccountIdParam_session()]);
                // sir code
            }
        });
    }
    
}
