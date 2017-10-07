import { Matter } from '../model/dmatter';

import { Injectable } from '@angular/core';
import { DUserEndpointService } from '../services/duser.endpoint.service';
import { FMatter } from '../model/fmatter';
import { LollyService } from '../services/lolly.service';
import { LoadingService } from '../loading/loading.service';
import { GoogleAPIService } from '../services/google.service';
import { Observable } from 'rxjs/Rx';
import { AlertService } from '../services/alert.service';
import { UtilService } from '../services/util.service';
import { Duser } from '../model/duser.model';
import { ObjectStorage } from '../model/objectStorage';
import { MdSnackBar, MdDialog } from '@angular/material';
import { Router } from '@angular/router'

@Injectable()
export class DMatterEndpointService extends LollyService {

    allItems: Matter[];
    private selectedItem: Matter;

    public constructor(protected router: Router, protected dialog: MdDialog) {
        super(router, dialog);
    }

    public getFiltered(fmatter: FMatter) {
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then((gapi) => {
                gapi.client.dmatterendpoint.getFiltered(fmatter).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }

    public getMatterDetails(selectedItem: Matter) {
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then((gapi) => {
                let contactId = JSON.parse(sessionStorage.getItem("signin_user")).dContact;
                gapi.client.dmatterendpoint.getMatterDetails({ "id": selectedItem.id, "contact": contactId }).execute((response) => {
                        this.processResponses(response, resolve, reject);
                    })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }

    //
    public getItem(id: number) {
        return this.allItems.find((item: any) => { return item.id.match(id) });
    }

}