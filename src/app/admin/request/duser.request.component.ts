import { Component, OnInit } from '@angular/core';
import { DUserEndpointService } from '../../services/duser.endpoint.service';
import { UtilService } from '../../services/util.service';
import { Account } from '../../model/dAccount';
import { DRequestDTO } from '../../model/dRequestdto';
import { Duser } from '../../model/duser.model';
import { ObjectStorage } from '../../model/objectStorage';
import { MdSnackBar, MdDialog } from '@angular/material';
import { Message } from '../../shared/messages';
import { ApprovedDuserRequestDialog } from '../../confirm-dialog/approvedDuserRequest.component';
import { DAccountEndpointService } from '../../services/daccountendpoint.service';



@Component({
    selector: 'request',
    templateUrl: './duser.request.component.html',
    styleUrls: ['../questionnaires/questionnaires.admin.component.css']

})

export class DuserRequestComponent {

    private title: String;
    private subtitle: String;
    private dAccount: Account;
    private dUser: Duser;
    private dRequestDtoList: Array<DRequestDTO>;
    private message: Message;
    private objectStorage: ObjectStorage;

    constructor(private dAccountendpoint: DAccountEndpointService, private dUserEndpointService: DUserEndpointService, private mdDialog: MdDialog,
        private utilService: UtilService, private toast: MdSnackBar) {
        this.objectStorage = ObjectStorage.getInstance();
        this.dUser = this.objectStorage.getUser_session();
        this.dAccount = this.dUser['account'];
        this.title = "New Request";
        this.subtitle = "List of Request";
        this.dAccountendpoint.getRequests(this.dAccount.id).then(response => {
            this.dRequestDtoList = response['items'];
            console.log(this.dRequestDtoList);
            this.message = new Message();
        });
    }



    public dRequestStatus(requestId: any, approve: boolean, index: any): any {
        console.log(requestId + ' ' + approve + ' ' + index);
        let dlg = this.mdDialog.open(ApprovedDuserRequestDialog, {
            //  width: '400px',
        });
        dlg.componentInstance.conform = this.message.conform;
        dlg.componentInstance.approve = approve;
        dlg.componentInstance.DENY = this.message.DENY;
        dlg.componentInstance.denyNote = this.message.denyNote;
        dlg.componentInstance.APPROVED = this.message.APPROVED;
        dlg.componentInstance.yes = this.message.yes;
        dlg.componentInstance.no = this.message.no;
        dlg.afterClosed().subscribe((result) => {
            if (result == 'YES') {
                console.log(result);
                this.updateRequest(requestId, approve, index);
            } else if (result == "NO") {
            }
        });
    }

    public updateRequest(requestId: any, approve: boolean, index: any) {
        this.dAccountendpoint.updateRequest(requestId, approve).then(response => {
            this.toast.open("Request: ", this.messageStatus(approve), { duration: 4000, });
            this.dRequestDtoList.splice(index, 1);
        });
    }

    public messageStatus(approve: boolean): string {
        return (approve) ? "APPROVED" : "DENY";
    }
}