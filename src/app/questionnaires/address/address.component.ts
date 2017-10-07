import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { DContactcacheEndpointService } from '../../services/dcontactcache.endpoint.service';
import { DQuestionnaireEndpoinService } from '../../services/dquestionnaireendpoin.service';
import { ContactCache } from '../../model/dContactCache';
import { ObjectStorage } from '../../model/objectStorage';
import { MdSnackBar, MdDialog } from '@angular/material';
import { LoadingService } from '../../loading/loading.service';
import { DateFormat } from '../../shared/datePipe';
@Component({
    selector: 'questionnaire-address',
    templateUrl: './address.component.html',
    styleUrls: ['../questionnaries.css'],

})
export class QuestionnaireAddressComponent extends QuestionnaireService {

    private isSameAsMailing: boolean;
    private today: number = Date.now();
    private values: Array<any> = ['Yes', 'No'];
    constructor(protected toast: MdSnackBar, protected dialog: MdDialog,
        protected contactCacheService: DContactcacheEndpointService,
        protected questionEndpointService: DQuestionnaireEndpoinService,
        private loadingService: LoadingService) {
        super(toast, dialog, contactCacheService, questionEndpointService, "ADDRESS");
        this.loadingService.start();
        this.title = "Address Information";
        this.subtitle = "Complete this form and submit to attorney";
        super.loadData().then((response) => {
            (response) ? this.data = response : "";
            this.loadingService.complete();
        })
    }

    private copyResidentialAddress(): void {
        this.data.addressMailingInCareOf = this.data.addressMainInCareOf;
        this.data.addressMailingBldType = this.data.addressMainBldType;
        this.data.addressMailingNum = this.data.addressMainNum;
        this.data.addressMailingCity = this.data.addressMainCity;
        this.data.addressMailingProvince = this.data.addressMainProvince;
        this.data.addressMailingCounty = this.data.addressMainCounty;
        this.data.addressMailingState = this.data.addressMainState;
        this.data.addressMailingZip = this.data.addressMainZip;
        this.data.addressMailingPostal = this.data.addressMainPostal;
    }

    public onSave(obj: ContactCache): void {
        super.saveData(obj);

    }

    public onSavenSubmit(obj: ContactCache): void {
        super.savenSubmit(obj, this.readOnly);

    }

}
