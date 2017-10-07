import { Component, OnInit } from '@angular/core';
import { DContactcacheEndpointService } from '../../services/dcontactcache.endpoint.service';
import { ContactCache } from '../../model/dContactCache'
import { MdSnackBar, MdDialog } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { LoadingService } from '../../loading/loading.service';
import { DQuestionnaireEndpoinService } from '../../services/dquestionnaireendpoin.service';
@Component({
    selector: 'questionnaire-criminal',
    templateUrl: './criminal.component.html',
    providers: [],
    styleUrls: ['../questionnaries.css']

})
export class CriminalComponent extends QuestionnaireService {
    private values: Array<any> = ['Yes', 'No'];
    constructor(private loadingService: LoadingService, protected toast: MdSnackBar, protected dialog: MdDialog, protected contactCacheService: DContactcacheEndpointService, protected questionEndpointService: DQuestionnaireEndpoinService) {
        super(toast, dialog, contactCacheService, questionEndpointService, "CRIMINAL");
        this.title = "Criminal Information";
        this.subtitle = "Complete this form and submit to attorney";
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