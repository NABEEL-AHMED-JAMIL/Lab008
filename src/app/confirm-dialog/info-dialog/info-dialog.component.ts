import { Component, Input, ViewChild, ComponentRef } from '@angular/core';
import { MdDialogRef } from '@angular/material';

// openDialogWithAResult
@Component({
    selector: 'info-dialog',
    templateUrl: './info-dialog.component.html',

})

export class InfoDialog {
    public title: String;
    public content: String;
    public buttonTitle: String;
    constructor(public dialogRef: MdDialogRef<InfoDialog>) {
        
    }

    public closeDialog(): void {
        this.dialogRef.close();
    }
}
