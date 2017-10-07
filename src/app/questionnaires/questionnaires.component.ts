import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Duser } from '../model/duser.model';
import { Questionnaire } from '../model/dQuestionnaire';
import { DQuestion, DQuestionFiled } from '../model/dQuestion';
import { ObjectStorage } from '../model/objectStorage';
import { ContactCache } from '../model/dContactCache';
import { QuestionnaireType } from '../model/dQuestionnaireType';
import { UtilService } from '../services/util.service';
import { DContactcacheEndpointService } from '../services/dcontactcache.endpoint.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoadingService } from '../loading/loading.service';
import { QuestionnaireService } from '../services/questionnaire.service';
import { MdDialog } from '@angular/material';
@Component({
    selector: 'questionnaires',
    templateUrl: './questionnaires.component.html',
    styleUrls: ['./questionnaries.css']
})

export class QuestionnairesComponent {

    private title: String;
    private subtitle: String;
    private duser: Duser;
    private visiblePage: boolean = false;
    private questionnaireType: QuestionnaireType;
    private questionnaires: Array<Questionnaire>;
    private customQuestionnaires: Array<DQuestion>;
    private contactCache: ContactCache;
    private contact: any;
    private objectStorage: ObjectStorage;
    constructor(private contactService: DContactcacheEndpointService, private utilService: UtilService,
        private router: Router, private dialog: MdDialog, private loadingService: LoadingService) {
        this.objectStorage = ObjectStorage.getInstance();
        this.duser = this.objectStorage.getUser_session();
        // fetch the data from server side base on  user contact id
        this.loadingService.start();
        this.contactService.getDContactCache(this.duser["dContact"]).then((res) => {
            if (res) {
                this.title = "Questionnaires";
                this.subtitle = "Complete the questionnaires below and submit to your attorney";
                this.contactCache = res;
                // store object in singltone class
                this.objectStorage.setContactCache(this.contactCache);
                this.questionnaires =  (res.questionnaire != null ? res.questionnaire : [])
                this.customQuestionnaires =  (res.customQuestionnaire != null ? res.customQuestionnaire : [])
                this.visiblePage = true;
            }
            this.loadingService.complete();
        });
    }


    private getTitle(quesName: String): String {
        return QuestionnaireService.getTitle(quesName);
    }

    private getInstruction(quesName: String): String {
        return QuestionnaireService.getInstruction(quesName);
    }

    private navigateTo(ques: Questionnaire): void {
        let path = QuestionnaireService.getPath(ques, "app");
        this.router.navigate(path);
    }

    private getClass(index: any): String {
        let className = "badge badge-pill badge-success";
        if (index == 0) {
            className = "badge badge-pill badge-primary";
        }
        return className;
    }
}
