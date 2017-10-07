import { Component, Input } from '@angular/core';

// openDialogWithAResult
@Component({
    selector: 'questionnaire-select',
    templateUrl: './questionnaire-selecte.compoent.html',

})
export class QuestionnaireSelectComponent {

    @Input()
    private list:Array<any>;

    @Input()
    private dataValue:any;
    constructor() {
    }
}
