import { Component, OnInit } from '@angular/core';
import { DContactcacheEndpointService } from '../../services/dcontactcache.endpoint.service';
import { DQuestionnaireEndpoinService } from '../../services/dquestionnaireendpoin.service';

import { ContactCache } from '../../model/dContactCache';
import { ObjectStorage } from '../../model/objectStorage';
import { ActivatedRoute} from '@angular/router';
import { MdSnackBar, MdDialog } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { LoadingService } from '../../loading/loading.service';

@Component({
    selector: 'custom-questionnaire',
    templateUrl: './custom.component.html',
    styleUrls: ['../questionnaries.css']

})
export class CustomeQuestionnaireComponent extends QuestionnaireService {

    private contactCache: ContactCache;
    constructor(private loadingService: LoadingService, protected toast: MdSnackBar, protected dialog: MdDialog, private activeRoute: ActivatedRoute, protected contactCacheService: DContactcacheEndpointService, protected questionEndpointService: DQuestionnaireEndpoinService) {
        super(toast, dialog, contactCacheService, questionEndpointService, "CUSTOM");
        this.readOnly = false;
        this.loadingService.start();
        this.loadData().then((response) => {
            if (response) {
                this.contactCache = response;
                if (this.activeRoute.snapshot.params.q) {
                    this.contactCache.customQuestionnaire.filter(obj => {
                        (obj.id == this.activeRoute.snapshot.params.q) ? this.contactCache.activeQuestionnaire = obj : "";
                    })
                }
                if (!(this.isAdmin) && (this.contactCache.activeQuestionnaire.status.toLocaleLowerCase() == 'approved' || this.contactCache.activeQuestionnaire.status.toLocaleLowerCase() == 'submitted')) {
                    this.readOnly = true;
                    if (this.contactCache.activeQuestionnaire.status.toLocaleLowerCase() == 'submitted') {
                        this.formStatus = 'submitted';
                    }
                }

                this.title = this.contactCache.activeQuestionnaire.title;
                this.subtitle = this.contactCache.activeQuestionnaire.instruction;
                this.formStatus = this.contactCache.activeQuestionnaire.status;
            }
            this.loadingService.complete();
        });
    }

    public onSave(): void {
        super.saveDataCustom(this.contactCache.activeQuestionnaire);
        this.objectStorage.setContactCache(this.contactCache);
    }

    public onSavenSubmit(): void {
        super.savenSubmitCustom(this.contactCache, this.readOnly);
        this.objectStorage.setContactCache(this.contactCache);

    }

}