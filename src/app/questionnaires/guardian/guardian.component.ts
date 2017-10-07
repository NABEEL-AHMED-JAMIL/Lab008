import { Component } from '@angular/core';
import { ContactCache } from '../../model/dContactCache'
import { MdSnackBar, MdDialog } from '@angular/material';
import { ConfirmDialog } from '../../confirm-dialog/confirmDialog.component';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { DContactcacheEndpointService } from '../../services/dcontactcache.endpoint.service';
import { DQuestionnaireEndpoinService } from '../../services/dquestionnaireendpoin.service';
import { LoadingService } from '../../loading/loading.service';
import { DateFormat } from '../../shared/datePipe';

@Component({
    selector: 'questionnaire-guardian',
    templateUrl: './guardian.component.html',
    providers: [],
    styleUrls: ['../questionnaries.css']

})
export class GuardianComponent extends QuestionnaireService {
    private martialStatus: Array<any> = ['Single', 'Never Married', 'Married', 'Divorced', 'Widowed', 'Marriage Annulled', 'Legally Sperated', 'Other'];
    constructor(private loadingService: LoadingService, protected toast: MdSnackBar, protected dialog: MdDialog, protected contactCacheService: DContactcacheEndpointService, protected questionEndpointService: DQuestionnaireEndpoinService) {
        super(toast, dialog, contactCacheService, questionEndpointService, "PARENTS");
        this.title = "Parents Information";
        this.subtitle = "Complete this form and submit to attorney";
        this.loadingService.start();
        super.loadData().then((response) => {
            (response) ? this.data = response : "";
            this.loadingService.complete();

        })


    }



    public onSave(obj: ContactCache): void {
        super.saveData(obj);
    }

    public onSavenSubmit(obj: ContactCache): void {
        super.savenSubmit(obj, this.readOnly);

    }
}
