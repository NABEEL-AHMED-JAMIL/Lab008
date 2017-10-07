import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionnaireFilterPipe } from './create-questionnaire-filter.pipe';
import { DQuestion, DQuestionFiled, QUESTIONNAIRES } from '../../../model/dQuestion';
import { ObjectStorage } from '../../../model/objectStorage';
import { ContactCache } from '../../../model/dContactCache';
import { DQuestionnaireEndpoinService } from '../../../services/dquestionnaireendpoin.service';
import { DContactcacheEndpointService } from '../../../services/dcontactcache.endpoint.service';
import { UtilService } from '../../../services/util.service';
import { MdSnackBar, MdDialog } from '@angular/material';
import { FILEDS } from './create-questionnaire-input-fileds';
import { DUserEndpointService } from '../../../services/duser.endpoint.service';

@Component({
    selector: 'create-questionnaire',
    templateUrl: './create-questionnaire.component.html',
    styleUrls: ['./create-questionnaire.component.css']
})

export class CreaeteQuestionnairesComponent {

    private title: String;
    private subtitle: String;
    private FILEDS: DQuestionFiled[] = [];
    private dQuestion: DQuestion;
    private id: any;
    private admiData: ContactCache;
    private objectStorage: ObjectStorage;


    constructor(private utilService:UtilService, private userEndPointService: DUserEndpointService, private contactcacheService: DContactcacheEndpointService, private dQuestionnaireEndpoinService: DQuestionnaireEndpoinService, private toast: MdSnackBar, private route: ActivatedRoute, private router: Router,private dialog:MdDialog) {
        this.title = 'Create New Questionnaire';
        this.subtitle = 'Use the form below to create a new questionnaire. Drag the desire fields into the form.';
        this.objectStorage = ObjectStorage.getInstance();
        this.dQuestion = new DQuestion();
        this.FILEDS = FILEDS;
        this.dQuestion.questions = [];
        this.userEndPointService.getAdminData().then(res => {
            this.admiData = res;
            let questionId = this.route.snapshot.params.p;
            this.admiData.account.questionnaires = (this.admiData.account.questionnaires != null) ? this.admiData.account.questionnaires : new Array();
            if (questionId) {
                this.admiData.account.questionnaires.filter((obj, index) => {
                    this.dQuestion = (obj.id == questionId) ? Object.assign({}, obj) : this.dQuestion;
                });

            }
        });

    }


    public addTo($event: any): any {
        this.dQuestion.questions.push($event.dragData);
    }

    public onRemoveItem(index: any, question: DQuestionFiled): any {
        this.dQuestion.questions.splice(index, 1);
        if (!this.dQuestion.questions) {
            this.dQuestion.questions = [];
        }
        // before adding the fields in the list find the field contain or not
        let findValue = this.FILEDS.find(x => x.id === question.id);
        if (!findValue) {
            this.FILEDS.unshift(question);
        }
        // if not find value add other 
    }

    public onSave(): any {
        this.dQuestionnaireEndpoinService.saveDQuestionnaireSet(this.dQuestion).then(res => {
            if (!this.dQuestion.id) {
                this.dQuestion = res;
                this.admiData.account.questionnaires.push(this.dQuestion);
            } else {
                this.admiData.account.questionnaires.filter((obj, index) => {
                    if (obj.id == this.dQuestion.id) {
                        this.admiData.account.questionnaires[index] = this.dQuestion;
                    }
                });
            }
            // update the singleton obj
            this.objectStorage.setAdminData(this.admiData);
            this.toast.open('Questionnaire', 'Data saved successfully.', {
                duration: 5000,
            });

        });
    }

    public onDelete(): any {
        let dialogs = this.utilService.openDialouge(this.dialog, "Delete Questionnaire", "Are you sure you want to delete?", "Yes", "No");
        dialogs.afterClosed().subscribe((result) => {
            if (result == 'PROCEED') {

                this.dQuestionnaireEndpoinService.removeDQuestionnaireSet(this.dQuestion.id).then(res => {
                    if (res) {
                        let questionId = this.route.snapshot.params.p;
                        // eliminate the deleted object from list
                        this.admiData.account.questionnaires.filter((obj, index) => {
                            (obj.id == questionId) ? this.admiData.account.questionnaires.splice(index, 1) : "";
                        });
                        // update the admin data
                        this.objectStorage.setAdminData(this.admiData);
                        this.router.navigate(['/admin/questionnaires']);
                        this.toast.open("Questionnaire", "Delete successfully", {
                            duration: 5000,
                        });

                    }
                });
            }
        });
    }

    public resetDQuestion(): any {
        this.dQuestion = new DQuestion();
        this.dQuestion.questions = [];
    }

    filterFields(input: any): any {
        this.FILEDS = FILEDS.filter((el: any) => { return el['label'].toLowerCase().indexOf(input.toLowerCase()) > -1; });
    }



}
