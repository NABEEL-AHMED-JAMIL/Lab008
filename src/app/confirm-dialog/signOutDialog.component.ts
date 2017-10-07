import { Component, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';

// openDialogWithAResult
@Component({
    selector: 'dialog-result-example-dialog',
    templateUrl: './confirmDialog.component.html',

})

// temporary class later , will be converted into generic func
export class SignoutDialuog {
    private content: String;
    private proceedButtonTitle: String;
    private cancelButtonTitle: String;

    constructor(public dialogRef: MdDialogRef<SignoutDialuog>) {
        this.content = "Would you like to log out?";
        this.proceedButtonTitle = "Yes";
        this.cancelButtonTitle = "No";

    }
}
