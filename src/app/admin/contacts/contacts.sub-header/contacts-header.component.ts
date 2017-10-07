import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ContactCache } from '../../../model/dContactCache';
import { ObjectStorage } from '../../../model/objectStorage';
import { DContactcacheEndpointService } from '../../../services/dcontactcache.endpoint.service';
import { DAccountEndpointService } from '../../../services/daccountendpoint.service';
import { UtilService } from '../../../services/util.service';
import { HeaderService } from '../../../services/header.service';
import { MdSnackBar, MdDialog } from '@angular/material';
import { MessageConfirmDialog } from '../../../confirm-dialog/messageDialog.component';
import { APPCONFIG } from '../../../config';

@Component({
    selector: 'contacts-header',
    templateUrl: './contacts-header.component.html',
    styleUrls: ['../../../layout/layout.component.css']
})


export class ContactsHeaderComponent extends HeaderService {

    @Input()
    private contactCache: ContactCache;
    @Input()
    private title: String;
    @Input()
    private subtitle: String;

    @Output()
    private persistResult = new EventEmitter<any>();

    @Input()
    private path: String = '/admin/contacts';


    private notificationOptions: any[] = [{ id: 1, option: 'Change Notification Email' }, { id: 2, option: 'Apply Preset' }, { id: 3, option: 'Download Contact' }];
    constructor(private accountEndpointServie: DAccountEndpointService, private utilService: UtilService, private contactService: DContactcacheEndpointService, private dialog: MdDialog, private toast: MdSnackBar) {
        super();
        this.objectStorage = ObjectStorage.getInstance();
        //this.appConfig = APPCONFIG;
    }

    //TODO - call Lolly method to create Contact in MEDA and link to DContactCache
    public onClick(id: any): void {
        this.contactService.linkToLolly(id).then((res) => {
            this.contactCache.isLollyContact = res.isLollyContact;
            this.toast.open("Linked", "Linked to lollylaw", {
                duration: 5000,
            });


        });
    }


    public sideOption(optionId: any) {
        if (optionId == 1) {
            let dlg = this.utilService.openMessageDialouge(this.dialog, this.contactCache.defaultAlertEmail, '600px',
                "Send notifications to:", "UPDATE", "CANCEL");
            dlg.afterClosed().subscribe((result) => {
                if (result.action == 'UPDATE') {
                    this.contactCache.defaultAlertEmail = result.value;
                    this.toast.open("UPDATE EMAIL", this.contactCache.defaultAlertEmail + "", {duration: 5000,});
                }
            });
        } else if (optionId == 2) {
            this.accountEndpointServie.getPresets().then(res => {
                if (res) {
                    let presets = (res.items != null) ? res.items : new Array();
                    let dlg = this.utilService.openPresetAssigneDialouge(this.dialog, "Apply a Preset", presets, "OKAY", "CANCEL")
                    dlg.afterClosed().subscribe((result) => {
                        if (result.action == 'SAVE') {
                            this.accountEndpointServie.assignPreset(this.objectStorage.getContactCache().id, result.value).then(res => {
                                if (res) {
                                    this.persistResult.emit(res);
                                    this.toast.open("Preset", "Preset Assigned", {duration: 5000});
                                }
                            });
                        }
                    });
                }
            })
        }
    }


}
