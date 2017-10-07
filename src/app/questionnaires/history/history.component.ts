import { Component} from '@angular/core';
import { DContactcacheEndpointService } from '../../services/dcontactcache.endpoint.service';
import { History } from '../../model/dhistory';
import { ContactCache } from '../../model/dContactCache'
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MdSnackBar, MdDialog } from '@angular/material';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { DQuestionnaireEndpoinService } from '../../services/dquestionnaireendpoin.service';
import { LoadingService } from '../../loading/loading.service';
@Component({
    selector: 'questionnaire-history',
    templateUrl: './history.component.html',
    styleUrls: ['../questionnaries.css']
})
export class HistoryComponent extends QuestionnaireService {
    
    private outcomeDispositionList: Array<any> = ['no charges filed', 'charges dismissed', 'jail', 'probation', 'etc'];
    constructor(private loadingService: LoadingService, protected toast: MdSnackBar, protected dialog: MdDialog, protected contactCacheService: DContactcacheEndpointService, protected questionEndpointService: DQuestionnaireEndpoinService) {
        super(toast, dialog, contactCacheService, questionEndpointService, "HISTORY");
        this.loadingService.start();
        super.loadData().then((response) => {
            if (response) {
                this.title = "History Information";
                this.subtitle = "Complete this form and submit to attorney";
                this.data = response;
                //if array is null or length is zero then put one element into array 
                if (!this.data.histories || this.data.histories.length == 0) {
                    this.data.histories = [];
                    this.data.histories.push(new History());
                }
            }
            this.loadingService.complete();
        });

    }



    public addHistory(): void {
        this.data.histories.push(new History());
    }

    public deleteHistory(index: number): void {
        this.data.histories.splice(index, 1);
    }


    public onSave(obj: ContactCache): void {
        super.saveData(obj);

    }

    public onSavenSubmit(obj: ContactCache): void {
        super.savenSubmit(obj, this.readOnly);

    }



}
