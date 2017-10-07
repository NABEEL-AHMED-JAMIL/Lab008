import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

// openDialogWithAResult
@Component({
    selector: 'dialog-result-example-dialog',
    template: `<h1 md-dialog-title>Confirm Submission</h1>
        <div md-dialog-content style="padding-bottom: 20px;">
            By completing and submitting these questionnaires, I understand and acknowledge that civil and criminal penalties 
            may be imposed upon individuals who knowingly provide false information or documentation used in 
            connection with representations made to the United States government. 
            I confirm that the information and documentation provided is, to the best of my knowledge, accurate, truthful and complete. 
            Accordingly, I verify that information and documentation that I have provided may be relied upon.        
        </div>
        <div md-dialog-actions>
            <button md-button (click)="dialogRef.close('PROCEED')">I Confirm</button>
            <button md-button (click)="dialogRef.close('CANCEL')">Cancel</button>
        </div>`,
})
export class ConfirmDialog {
    constructor(public dialogRef: MdDialogRef<ConfirmDialog>) {}
}
