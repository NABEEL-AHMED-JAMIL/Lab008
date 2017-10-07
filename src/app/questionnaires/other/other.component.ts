import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DContactcacheEndpointService } from '../../services/dcontactcache.endpoint.service';
import { Other } from '../../model/dOther';
import { ContactCache } from '../../model/dContactCache'
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MdSnackBar, MdDialog } from '@angular/material';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { DQuestionnaireEndpoinService } from '../../services/dquestionnaireendpoin.service';
import { LoadingService } from '../../loading/loading.service';
@Component({
    selector: 'questionnaire-other',
    templateUrl: './other.component.html',
    styleUrls: ['../questionnaries.css']
})
export class OtherComponent extends QuestionnaireService {

    constructor(private loadingService: LoadingService, protected toast: MdSnackBar, protected dialog: MdDialog, protected contactCacheService: DContactcacheEndpointService, protected questionEndpointService: DQuestionnaireEndpoinService) {
        super(toast, dialog, contactCacheService, questionEndpointService, "OTHER");
        this.title = "Other Information";
        this.subtitle = "Complete this form and submit to attorney";
        this.loadingService.start();
        super.loadData().then((response) => {
            if (response) {
                this.data = response;
                if (!this.data.others || this.data.others.length == 0) {
                    this.data.others = [];
                    this.data.others.push(new Other());
                }
            }
            this.loadingService.complete();
        })
    }

    public addOther(): void {
        this.data.others.push(new Other());
    }

    public deleteOther(index: number): void {
        this.data.others.splice(index, 1);
    }


    public onSave(obj: ContactCache): void {
        super.saveData(obj);
    }

    public onSavenSubmit(obj: ContactCache): void {
        super.savenSubmit(obj, this.readOnly);
    }
}
