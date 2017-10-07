import { Component, OnInit, ElementRef } from '@angular/core';
import { DContactcacheEndpointService } from '../../services/dcontactcache.endpoint.service';
import { ChildrenInfromation } from '../../model/dChildrenInformation';
import { ContactCache } from '../../model/dContactCache'
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MdSnackBar, MdDialog } from '@angular/material';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { LoadingService } from '../../loading/loading.service';
import { DQuestionnaireEndpoinService } from '../../services/dquestionnaireendpoin.service';
@Component({
    selector: 'questionnaire-children',
    templateUrl: './children.component.html',
    styleUrls: ['../questionnaries.css']


})
export class ChildrenComponent extends QuestionnaireService {

    private formSubmitted = false;
    private childRelationList: Array<any> = ['biological child', 'stepchild', 'legally adopted child'];
    private genders: Array<any> = ['Male', 'Female'];
    constructor(private loadingService: LoadingService, protected toast: MdSnackBar, protected dialog: MdDialog, protected contactCacheService: DContactcacheEndpointService, protected questionEndpointService: DQuestionnaireEndpoinService) {
        super(toast, dialog, contactCacheService, questionEndpointService, "CHILDREN");
        this.title = "Income Information";
        this.subtitle = "Complete this form and submit to attorney";
        super.loadData().then((response) => {
            if (response) {
                this.data = response;
                //if array is null or length is zero then put one element into array 
                if (!this.data.children || this.data.children.length == 0) {
                    this.data.children = [];
                    this.data.children.push(new ChildrenInfromation());
                }
            }
            this.loadingService.complete();
        })
    }


    public addChild(): void {
        this.data.children.push(new ChildrenInfromation());
    }

    public deleteChild(index: number): void {
        this.data.children.splice(index, 1);
    }

    public onSave(obj: ContactCache): void {
        super.saveData(obj);

    }

    public onSavenSubmit(obj: ContactCache): void {
        super.savenSubmit(obj, this.readOnly);

    }

}
