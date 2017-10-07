import { Component, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';

// openDialogWithAResult
@Component({
    selector: 'approved-request-dialog',
    templateUrl: './approvedDuserRequest.component.html',

})
export class ApprovedDuserRequestDialog {
    
    public conform:String;
    public approve: Boolean;
    public DENY: String;
    public denyNote: String;
    public APPROVED: String;
    public yes: String;
    public no: String;

    constructor(public dialogRef: MdDialogRef<ApprovedDuserRequestDialog>) {

        
    }
}