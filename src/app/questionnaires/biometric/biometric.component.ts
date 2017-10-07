import { Component, OnInit } from '@angular/core';
import { DContactcacheEndpointService } from '../../services/dcontactcache.endpoint.service';
import { ContactCache } from '../../model/dContactCache'
import { MdSnackBar, MdDialog } from '@angular/material';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { DQuestionnaireEndpoinService } from '../../services/dquestionnaireendpoin.service';
import { LoadingService } from '../../loading/loading.service';
@Component({
    selector: 'questionnaire-biometric',
    templateUrl: './biometric.component.html',
    providers: [],
    styleUrls: ['../questionnaries.css']

})
export class BioMetricComponent extends QuestionnaireService {

    private formSubmitted = false;

    constructor(private loadingService: LoadingService, protected toast: MdSnackBar, protected dialog: MdDialog, protected contactCacheService: DContactcacheEndpointService, protected questionEndpointService: DQuestionnaireEndpoinService) {
        super(toast, dialog, contactCacheService, questionEndpointService, "BIOMETRIC");
        this.title = "Biometric Information";
        this.subtitle = "Complete this form and submit to attorney";

        this.loadingService.start();
        super.loadData().then((response) => {
            (response) ? this.data = response : "";
            this.loadingService.stop();
        })
    }

    public onSave(obj: ContactCache): void {
        super.saveData(obj);
    }

    public onSavenSubmit(obj: ContactCache): void {
        super.savenSubmit(obj, this.readOnly);
    }

}
