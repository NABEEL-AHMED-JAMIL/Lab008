import { Injectable } from '@angular/core';
import { LollyService } from '../services/lolly.service';
import { LoadingService } from '../loading/loading.service';
import { DQuestion } from '../model/dQuestion';
import { MdSnackBar, MdDialog } from '@angular/material';
import { Router } from '@angular/router'


@Injectable()
export class DQuestionnaireEndpoinService extends LollyService {

    public constructor(protected router: Router, protected dialog: MdDialog) {
        super(router, dialog);
    }

    public assignDQuestionnaire(id: any, question: DQuestion) {
        console.log(id + " Object " + JSON.stringify(question));
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then((gapi) => {
                gapi.client.dquestionnaireendpoint.assignDQuestionnaire({ "contactId": id }, question).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }

    public getDQuestionnaireSet() { }

    public removeDQuestionnaireSet(id: number) {
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then((gapi) => {
                gapi.client.dquestionnaireendpoint.removeDQuestionnaireSet({ "id": id }).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }

    public saveDQuestionnaireSet(questionnaires: DQuestion) {
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then((gapi) => {
                gapi.client.dquestionnaireendpoint.saveDQuestionnaireSet(questionnaires).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }

}