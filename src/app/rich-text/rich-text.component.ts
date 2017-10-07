import { Component, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';

// openDialogWithAResult
@Component({
    selector: 'rich-text',
    templateUrl: './rich-text.component.html',

})
export class RichText {
    public title: String;
    public content:String;
    public save: String;
    public cancel: String;
    constructor(public dialogRef: MdDialogRef<RichText>) {

    }

    public options: Object = {
        charCounterCount: false,
        toolbarButtons: ['bold', 'italic', 'underline', 'formatUL', 'formatOL'],
    };
}
