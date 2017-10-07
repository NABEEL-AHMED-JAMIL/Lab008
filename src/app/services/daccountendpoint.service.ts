import { ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FMatter } from '../model/fmatter';
import { Duser } from '../model/duser.model';
import { Account } from '../model/dAccount';
import { LollyService } from '../services/lolly.service';
import { LoadingService } from '../loading/loading.service';
import { DContactcacheEndpointService } from '../services/dcontactcache.endpoint.service';
import { GoogleAPIService } from '../services/google.service';
import { UtilService } from '../services/util.service';
import { FormGroup } from '@angular/forms';
import { Settings } from './../model/dSettings';
import { DRequestDTO } from './../model/dRequestdto';
import { MdSnackBar, MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DAccountEndpointService extends LollyService {


    constructor(protected router: Router, protected dialog: MdDialog, private zone: NgZone, private toast: MdSnackBar) {
        super(router, dialog);
    }


    public loadTheme(accountId: any) {
        return new Promise<any>((resolve, reject) => {
            this.googleApiService.GetClient().then((gapi) => {
                gapi.client.daccountendpoint.loadTheme({ accountId: accountId }).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }

    // user account setting or theme
    public updateSettings(account: Account): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then((gapi) => {
                gapi.client.daccountendpoint.updateSettings(account).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })

    }


    public getRequests(accountId: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then((gapi) => {
                gapi.client.daccountendpoint.getRequests({ 'accountId': accountId }).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }
    public getRequest(requestId: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then((gapi) => {
                gapi.client.daccountendpoint.getRequest({ 'requestId': requestId }).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }

    public updateRequest(requestId: any, approve: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then((gapi) => {
                gapi.client.daccountendpoint.updateRequest({ "requestId": requestId, "approve": approve }).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }


    public getPresets(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then((gapi) => {
                gapi.client.daccountendpoint.getPresets().execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }

    

    public savePreset(preset: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then((gapi) => {
                gapi.client.daccountendpoint.savePreset(preset).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }

    public removePreset(id: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then((gapi) => {
                gapi.client.daccountendpoint.removeDPreset({ "id": id }).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }

    public assignPreset(dContactId: any, preset: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then((gapi) => {
                gapi.client.daccountendpoint.assignPreset({ "dContactId": dContactId }, preset).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }


}