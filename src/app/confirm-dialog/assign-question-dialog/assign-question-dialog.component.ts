import { Component, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { DQuestion } from '../../model/dQuestion';
import { QuestionnaireSelectComponent} from '../questionnaire-selecte.compoent';

// openDialogWithAResult
@Component({
    selector: 'assign-question-dialog',
    templateUrl: './assign-question-dialog.component.html',

})
export class AssignQuestionDialog {

    public title:String;
    public cancelButtonTitle: String;
    public saveButtonTitle: String;
    public questionnaires: Array<DQuestion>; 
    public data: {
        value: any;
        action: String;
    };
    constructor(public dialogRef: MdDialogRef<AssignQuestionDialog>) {

    }
}