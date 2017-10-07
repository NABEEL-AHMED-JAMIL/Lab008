import { ElementRef } from '@angular/core';
import { Inject, Injectable, Injector, ReflectiveInjector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GoogleAPIService } from '../services/google.service';
import { AlertService } from '../services/alert.service';
import { UtilService } from '../services/util.service';
import { ObjectStorage } from '../model/objectStorage';
import { InfoDialog } from '../confirm-dialog/info-dialog/info-dialog.component';
import { MdSnackBar, MdDialog } from '@angular/material';


let SCOPES: any[] = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/drive'];
let CLIENT_ID = "934291292658-0bsot7ammlcec61eln4ejl7neqceje6v.apps.googleusercontent.com";
// discovery Docs
let DISDOCS: any[] = ['https://test-dot-dev-lolly.appspot.com/_ah/api/discovery/v1/apis/duserendpoint/v1/rest'];


@Injectable()
export class LollyService {

    protected googleApiService: GoogleAPIService;
    public static gapi_obj: any;
    protected utilService: UtilService;
    protected dUser: any;
    protected objectStorage: ObjectStorage;
    constructor(protected router: Router, protected dialog: MdDialog, ) {
        this.googleApiService = GoogleAPIService.getInstance();
        this.objectStorage = ObjectStorage.getInstance();
        this.utilService = new UtilService();
        this.dUser = this.objectStorage.getUser_session();
    }


    // if response not  contain error like 401 404  503 etc then resolve 
    public processResponse(response, currentObj): any {
        if (response['code']) {
            let error = this.fetchMessage(response);
            return this.fetchMessage(response);
        } else {
            return response;
        }
    }
    public processResponses(response, resolve, reject): any {
        if (response['code']) {
            return reject(this.fetchMessage(response));
        } else {
            return resolve(JSON.parse(JSON.stringify(response)));
        }
    }


    protected populateDialog(appError: AppERROR) {
        let dlg = this.utilService.openInfoDialouge(this.dialog, appError.title,appError.message, "OK");
        dlg.afterClosed().subscribe((result) => {
            if (appError.type == 'AUTH_ERROR') {
                window.location.reload();
                this.router.navigate(['/login', localStorage.getItem('accountIdParam')]);
            }
        });

    }

    private fetchMessage(response): AppERROR {
        let appError: AppERROR = new AppERROR();
        appError.code = response.code;
        appError.message = response.message.split(":")[1];
        appError.title = response.message.split(":")[0];
        if (response.message.indexOf("AuthenticationException") != -1 || response.message.indexOf("OAuthRequestException") != -1) { // un-authorize
            appError.type = "AUTH_ERROR";
        }
        return appError;
    }


    // if  token lost during refresh page then again follow the login process in google signin case
    public authenticate(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (LollyService.gapi_obj === undefined) {
                this.googleApiService.GetClient().then((gapi) => {
                    if (this.objectStorage.getClient_token()) {
                        gapi.auth.setToken({ access_token: this.objectStorage.getClient_token() });
                    } else {
                        gapi.auth.setToken({ access_token: this.objectStorage.getGapi_token() });
                    }
                    gapi.client.duserendpoint.authenticate().execute((result) => {
                        sessionStorage.setItem("signin_user", JSON.stringify(result));
                        LollyService.gapi_obj = gapi;
                        resolve(gapi);
                    });
                });

            } else {
                resolve(LollyService.gapi_obj);
            }

        })
    }

    public googleAuthenticate(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.googleApiService.GetClient().then((gapi) => {
                LollyService.gapi_obj = gapi;
                gapi.auth.authorize({ client_id: CLIENT_ID, scope: SCOPES, immediate: false }, () => {
                    gapi.client.oauth2.userinfo.get().execute((userInfo) => {
                        this.objectStorage.setGapi_token(gapi.auth.getToken().access_token);
                        resolve(gapi);
                    });
                });
            })
        })
    }
}

export class AppERROR {
    type: String;
    message: String;
    code: String;
    title: String;
}