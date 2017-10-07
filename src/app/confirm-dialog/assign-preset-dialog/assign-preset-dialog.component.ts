import { Component, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Presets } from '../../model/dPresets';
import { QuestionnaireSelectComponent } from '../questionnaire-selecte.compoent';

// openDialogWithAResult
@Component({
    selector: 'assign-preset-dialog',
    templateUrl: './assign-preset-dialog.component.html',

})
export class AssignPresetDialog {

    public title: String;
    public cancelButtonTitle: String;
    public saveButtonTitle: String;
    public presets: Array<Presets>;
    public cancel: String;
    public save: String;

    public data: {
        value: Presets;
        action: String;
    };
    constructor(public dialogRef: MdDialogRef<AssignPresetDialog>) {

    }
}