import { Component, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';

// openDialogWithAResult
@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirmDialog.component.html',

})
export class ConfirmDialog {
    public title:String;
    public content: String;
    public proceedButtonTitle: String;
    public cancelButtonTitle: String;

    constructor(public dialogRef: MdDialogRef<ConfirmDialog>) {

        
    }
}
