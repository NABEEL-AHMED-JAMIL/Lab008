import { Component, OnInit, ElementRef } from '@angular/core';
import { DContactcacheEndpointService } from '../../services/dcontactcache.endpoint.service';
import { I94Entries } from '../../model/I94Entries';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactCache } from '../../model/dContactCache'
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MdSnackBar, MdDialog } from '@angular/material';
import { ConfirmDialog } from '../../confirm-dialog/confirmDialog.component';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { DQuestionnaireEndpoinService } from '../../services/dquestionnaireendpoin.service';
import { LoadingService } from '../../loading/loading.service';
@Component({
    selector: 'questionnaire-i94Entries',
    templateUrl: './i94Entries.component.html',
    styleUrls: ['../questionnaries.css']
})
export class i94EntriesComponent extends QuestionnaireService {
    private childRelationList: Array<any> = ['Visitor', 'Student', 'Temp worker', 'etc'];
    constructor(private loadingService: LoadingService, protected toast: MdSnackBar, protected dialog: MdDialog, protected contactCacheService: DContactcacheEndpointService, protected questionEndpointService: DQuestionnaireEndpoinService) {
        super(toast, dialog, contactCacheService, questionEndpointService, "I94Entries");
        this.title = "I94 Entries Information";
        this.subtitle = "Complete this form and submit to attorney";
        super.loadData().then((response) => {
            if (response) {
                this.data = response;
                //if array is null or length is zero then put one element into array 
                if (!this.data.i94Entries || this.data.i94Entries.length == 0) {
                    this.data.i94Entries = [];
                    this.data.i94Entries.push(new I94Entries());
                }
            }
            this.loadingService.complete();

        })
    }

    private addI94Entries(): void {
        this.data.i94Entries.push(new I94Entries());
    }

    private deleteI94Entries(index: number): void {
        this.data.i94Entries.splice(index, 1);
    }


    private onSave(obj: ContactCache): void {
        super.saveData(obj);

    }

    private onSavenSubmit(obj: ContactCache): void {
        super.savenSubmit(obj, this.readOnly);
    }
}
