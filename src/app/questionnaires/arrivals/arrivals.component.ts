import { Component } from '@angular/core';
import { DContactcacheEndpointService } from '../../services/dcontactcache.endpoint.service';
import { DQuestionnaireEndpoinService } from '../../services/dquestionnaireendpoin.service';
import { Arrivals } from '../../model/darrivals';
import { ContactCache } from '../../model/dContactCache'
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MdSnackBar, MdDialog } from '@angular/material';
import { ConfirmDialog } from '../../confirm-dialog/confirmDialog.component';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { LoadingService } from '../../loading/loading.service';
@Component({
    selector: 'questionnaire-arrivals',
    templateUrl: './arrivals.component.html',
    styleUrls: ['../questionnaries.css']
})
export class ArrivalsComponent extends QuestionnaireService {


    constructor(private loadingServie: LoadingService, protected toast: MdSnackBar, protected dialog: MdDialog, protected contactCacheService: DContactcacheEndpointService, protected questionEndpointService: DQuestionnaireEndpoinService) {
        super(toast, dialog, contactCacheService, questionEndpointService, "ARRIVAL");
        this.title = "Arrival Information";
        this.subtitle = "Complete this form and submit to attorney";
        this.loadingServie.start();
        super.loadData().then((response) => {
            if (response) {
                this.data = response;
                //if array is null or length is zero then put one element into array 
                if (!this.data.arrivals || this.data.arrivals.length == 0) {
                    this.data.arrivals = [];
                    this.data.arrivals.push(new Arrivals());
                }
            }
            this.loadingServie.complete();
        });
    }

    public addArrivals(): void {
        this.data.arrivals.push(new Arrivals());
    }

    public deleteArrivals(index: number): void {
        this.data.arrivals.splice(index, 1);
    }



    public onSave(obj: ContactCache): void {
        super.saveData(obj);

    }

    public onSavenSubmit(obj: ContactCache): void {
        super.savenSubmit(obj, this.readOnly);
    }


}
