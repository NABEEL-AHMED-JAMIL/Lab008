import { Matter } from '../model/dmatter';

import { Injectable } from '@angular/core';
import { DUserEndpointService } from '../services/duser.endpoint.service';
import { FMatter } from '../model/fmatter';
import { Duser } from '../model/duser.model';
import { DTask } from '../model/dTask';
import { LollyService } from '../services/lolly.service';
import { LoadingService } from '../loading/loading.service';
import { GoogleAPIService } from '../services/google.service';
import { Observable } from 'rxjs/Rx';
import { MdSnackBar, MdDialog } from '@angular/material';
import { Router } from '@angular/router'


@Injectable()
export class DTaskEndpointService extends LollyService {

    public constructor(protected router: Router, protected dialog: MdDialog) {
        super(router, dialog);
    }

    public saveTask(data: DTask) {
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then((gapi) => {
                gapi.client.dtaskendpoint.saveDTaskSet(data).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }

    public deleteTask(id: any) {
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then((gapi) => {
                gapi.client.dtaskendpoint.removeDTaskSet({ "id": id }).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }


    public assignTask(contactId: any, data: DTask): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then((gapi) => {
                gapi.client.dtaskendpoint.assignTask({ "contactId": contactId }, data).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }


    public updateDTask(id: number, done: boolean) {
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then((gapi) => {
                gapi.client.dtaskendpoint.saveDTaskSet({ "id": id, "done": done }).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }

}