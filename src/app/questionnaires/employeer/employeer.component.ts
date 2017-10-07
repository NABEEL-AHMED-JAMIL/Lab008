import { Component } from '@angular/core';
import { DContactcacheEndpointService } from '../../services/dcontactcache.endpoint.service';
import { ContactCache } from '../../model/dContactCache'
import { MdSnackBar, MdDialog } from '@angular/material';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { LoadingService } from '../../loading/loading.service';
import { DQuestionnaireEndpoinService } from '../../services/dquestionnaireendpoin.service';
@Component({
    selector: 'questionnaire-employeer',
    templateUrl: './employeer.component.html',
    styleUrls: ['../questionnaries.css']

})
export class EmployeerComponent extends QuestionnaireService {


    constructor(private loadingService: LoadingService, protected toast: MdSnackBar, protected dialog: MdDialog, protected contactCacheService: DContactcacheEndpointService, protected questionEndpointService: DQuestionnaireEndpoinService) {
        super(toast, dialog, contactCacheService, questionEndpointService, "INCOME");
        this.title = "Income Information";
        this.subtitle = "Complete this form and submit to attorney";
        this.loadingService.start();
        super.loadData().then((response) => {
            (response) ? this.data = response : "";
            this.loadingService.complete();

        });
    }

    public onSave(obj: ContactCache): void {
        super.saveData(obj);

    }


    public onSavenSubmit(obj: ContactCache): void {
        super.savenSubmit(obj, this.readOnly);

    }


}
