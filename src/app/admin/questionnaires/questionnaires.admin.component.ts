import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChecklistComponent } from '../checklists/checklists.component';
import { DContactcacheEndpointService } from '../../services/dcontactcache.endpoint.service';
import { UtilService } from '../../services/util.service';
import { DQuestion, QUESTIONNAIRES } from '../../model/dQuestion';
import { ContactCache } from '../../model/dContactCache';
import { ObjectStorage } from '../../model/objectStorage';
import { DQuestionnaireEndpoinService } from '../../services/dquestionnaireendpoin.service';
import { DUserEndpointService } from '../../services/duser.endpoint.service';
import { LoadingService } from '../../loading/loading.service';
import { MdSnackBar, MdDialog } from '@angular/material';


@Component({
    selector: 'admin-questionnaires',
    templateUrl: './questionnaires.admin.component.html',
    styleUrls: ['./questionnaires.admin.component.css', '../admin.component.css']
})

export class QuestionnairesAdminComponent {

    private questionnaires: DQuestion[];
    private adminData: ContactCache;
    private objectStorage: ObjectStorage;
    // private contactCache: ContactCache;
    constructor(private userEndPointService: DUserEndpointService, private loadingService: LoadingService, private utilService: UtilService, private dialog: MdDialog, private router: Router, private contactCacheService: DContactcacheEndpointService,
        private dQuestionnaireEndpoinService: DQuestionnaireEndpoinService, private toast: MdSnackBar) {
        this.objectStorage = ObjectStorage.getInstance();
        this.loadingService.start();
        this.userEndPointService.getAdminData().then(response => {
            if (response) {
                this.adminData = response;
                this.questionnaires = response.account.questionnaires;
                this.questionnaires = (this.questionnaires != null) ? this.questionnaires : new Array<DQuestion>();;
                this.questionnaires = this.questionnaires.concat(QUESTIONNAIRES);
            }
            this.loadingService.complete();
        });
    }

    public removeQuestionnaire(id: number) {
        let dialogs = this.utilService.openDialouge(this.dialog, "Delete Questionnaire", "Are you sure you want to delete?", "Yes", "No");
        dialogs.afterClosed().subscribe((result) => {
            if (result == 'PROCEED') {
                this.dQuestionnaireEndpoinService.removeDQuestionnaireSet(id).then(response => {
                    this.toast.open('Questionnaire', 'Data saved.', { duration: 5000 });
                    this.questionnaires.filter((obj, index) => {
                        (obj.id == id) ? this.questionnaires.splice(index, 1) : "";
                    })
                    this.adminData.account.questionnaires = this.questionnaires;
                    this.objectStorage.setAdminData(this.adminData);

                });
            }
        });
    }

    private createQuestionnaire(): void {
        this.router.navigate(['/admin/createQuetionnaire']);
    }

    private updateQuestoin(quesObj: any): void {
        (quesObj["id"]) ? this.router.navigate(['/admin/createQuetionnaire', { p: quesObj.id }]) : "";
    }
}