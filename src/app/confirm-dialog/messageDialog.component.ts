import { Component, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';


// openDialogWithAResult
@Component({
    selector: 'message-Confirm-Dialog',
    templateUrl: './messageDialog.component.html',

})
export class MessageConfirmDialog {

    public title:String;
    // public firmSupportURLCB: String;
    public cancelButtonTitle: String;
    public saveButtonTitle: String;
    public placeHolder:String = "Email";
    public data: {
        value: String ;
        action: String;
    };
    constructor(public dialogRef: MdDialogRef<MessageConfirmDialog>) {

    }
}