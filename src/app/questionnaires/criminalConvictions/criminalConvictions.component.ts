import { Component, OnInit, ElementRef } from '@angular/core';
import { CriminalConvictions } from '../../model/dCriminalConvictions';
import { DContactcacheEndpointService } from '../../services/dcontactcache.endpoint.service';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ContactCache } from '../../model/dContactCache'
import { MdSnackBar, MdDialog } from '@angular/material';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { LoadingService } from '../../loading/loading.service';
import { DQuestionnaireEndpoinService } from '../../services/dquestionnaireendpoin.service';
@Component({
    selector: 'questionnaire-criminal-convictions',
    templateUrl: './criminalConvictions.component.html',
    styleUrls: ['../questionnaries.css']
})
export class CriminalConvictionsComponent extends QuestionnaireService {
    private values: Array<any> = ['Yes', 'No'];
    constructor(private loadingService: LoadingService, protected toast: MdSnackBar, protected dialog: MdDialog, protected contactCacheService: DContactcacheEndpointService, protected questionEndpointService: DQuestionnaireEndpoinService) {
        super(toast, dialog, contactCacheService, questionEndpointService, "CRIMINALCONVICTION");
        this.title = "Criminal Convictions Information";
        this.subtitle = "Complete this form and submit to attorney";
        super.loadData().then((response) => {
            if (response) {
                this.data = response;
                if (!this.data.criminalConvictions || this.data.criminalConvictions.length == 0) {
                    this.data.criminalConvictions = [];
                    this.data.criminalConvictions.push(new CriminalConvictions());
                }
            }
            this.loadingService.complete();
        })
    }

    private addCriminalConviction(): void {
        this.data.criminalConvictions.push(new CriminalConvictions());
    }

    private deleteCriminalConviction(index: number): void {
        this.data.criminalConvictions.splice(index, 1);
    }

    private onSave(obj: ContactCache): void {
        this.saveData(obj);

    }

    private onSavenSubmit(obj: ContactCache): void {
        super.savenSubmit(obj, this.readOnly);

    }

}
