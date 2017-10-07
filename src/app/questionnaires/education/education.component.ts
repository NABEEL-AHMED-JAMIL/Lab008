import { Component} from '@angular/core';
import { DContactcacheEndpointService } from '../../services/dcontactcache.endpoint.service';
import { Education } from '../../model/deducation'
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ContactCache } from '../../model/dContactCache';
import { MdSnackBar, MdDialog } from '@angular/material';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { LoadingService } from '../../loading/loading.service';
import { DQuestionnaireEndpoinService } from '../../services/dquestionnaireendpoin.service';

@Component({
    selector: 'questionnaire-education',
    templateUrl: './education.component.html',
    styleUrls: ['../questionnaries.css']

})
export class EducationComponent extends QuestionnaireService {
    constructor(private loadingService: LoadingService, protected toast: MdSnackBar, protected dialog: MdDialog, protected contactCacheService: DContactcacheEndpointService, protected questionEndpointService: DQuestionnaireEndpoinService) {
        super(toast, dialog, contactCacheService, questionEndpointService, "EDUCATION");
        this.loadingService.start();
        this.title = "Education Information";
        this.subtitle = "Complete this form and submit to attorney";
        super.loadData().then((response) => {
            if (response) {
                this.data = response;
                //if array is null or length is zero then put one element into array 
                if (!this.data.educations || this.data.educations.length == 0) {
                    this.data.educations = [];
                    this.data.educations.push(new Education());
                }
            }
            this.loadingService.complete();
        });
    }

    public addEducation(): void {
        this.data.educations.push(new Education());
    }

    public deleteEducation(index: number): void {
        this.data.educations.splice(index, 1);
    }


    public onSave(obj: ContactCache): void {
        super.saveData(obj);
    }

    public onSavenSubmit(obj: ContactCache): void {
        super.savenSubmit(obj, this.readOnly);

    }

}
