import { Component, Input, OnInit} from '@angular/core';
import { APPCONFIG } from '../../config';
import { DUserEndpointService } from '../../services/duser.endpoint.service';
import { Settings } from '../../model/dSettings';
import { UtilService } from '../../services/util.service';
import { SettingsHeaderComponent } from '../settings/settings.sub-header/settings-header.component';
import { Account } from '../../model/dAccount';
import { MdSnackBar, MdDialog } from '@angular/material';
import { Duser } from '../../model/duser.model';
import { ObjectStorage } from '../../model/objectStorage';
import { MessageConfirmDialog } from '../../confirm-dialog/messageDialog.component';
import { Router } from '@angular/router';
import { LoadingService } from '../../loading/loading.service';
import { DAccountEndpointService } from '../../services/daccountendpoint.service';


@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

export class SettingsComponent {

    public appConfig: Settings;
    private title: String;
    private subtitle: String;
    private dAccount: Account;
    private dUser: Duser;
    public logoImage: String = 'http://www.mango.org/Mangos/media/Media/Images/Header%20Images/facts.jpg';
    private objectStorage: ObjectStorage

    constructor(private dAccountendpoint: DAccountEndpointService,private userService: DUserEndpointService, private utilService: UtilService,
        private toast: MdSnackBar, private router: Router,
        private loadingService: LoadingService, private dialog: MdDialog) {
        this.objectStorage = ObjectStorage.getInstance();
        this.title = "Settings";
        this.subtitle = "Manage your account configuration";
        this.dUser = this.objectStorage.getUser_session();
        this.dAccount = this.dUser['account'];
        this.dAccount.firmLogoCB = (this.dAccount.firmLogoCB != null ? this.dAccount.firmLogoCB : this.logoImage);
        this.utilService.loadTheme();
        this.appConfig = APPCONFIG;
    }

    public addUrl(): void {

        let dlg = this.dialog.open(MessageConfirmDialog, {
            // height: '600px',
            width: '600px',
        });
        dlg.componentInstance.title = "Add a Firm Logo";
        dlg.componentInstance.cancelButtonTitle = "CANCEL";
        dlg.componentInstance.saveButtonTitle = 'SAVE';
        dlg.componentInstance.placeHolder = 'Firm Logo';
        dlg.componentInstance.data = {
            value: this.dAccount.firmLogoCB,
            action: 'SAVE'
        };
        dlg.afterClosed()
            .subscribe((result) => {
                if (result.action === 'SAVE') {
                    this.utilService.setfirmLogoCB(result.value);
                    this.dAccount.firmLogoCB = result.value;
                    this.logoImage = this.dAccount.firmLogoCB;
                } else if (result === 'CANCEL') {
                    console.log(result);
                }
            });
    }

    public onSave(): void {
        // assign the value to the setting
        this.dAccount.settings = this.appConfig;
        this.dAccountendpoint.updateSettings(this.dAccount).then(res => {
            let user = this.objectStorage.getUser_session()
            user.account.settings = this.appConfig;
            user.account.firmLogoCB = res.firmLogoCB;
            // update the session user 
            this.objectStorage.setUser_session(JSON.stringify(user));
            this.toast.open('Setting', 'Data saved successfully.', {
                duration: 5000,
            });

        });
    }

}
