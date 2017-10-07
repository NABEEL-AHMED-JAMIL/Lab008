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

@Injectable()
export class DUserEndpointService extends LollyService {


    constructor(protected router: Router, protected dialog: MdDialog, private zone: NgZone, private toast: MdSnackBar,
        private dContactcacheService: DContactcacheEndpointService) {
        super(router, dialog);
    }

    // this will be used for the form page login
    public login(loginForm: FormGroup) {
        return new Promise<any>((resolve, reject) => {
            let formObj = { "username": loginForm.value.email, "password": loginForm.value.password, };
            this.googleApiService.GetClient().then((gapi) => {
                gapi.client.duserendpoint.login(formObj).execute((response) => {
                    if (!response.code) {
                        gapi.client.setToken({ access_token: response['result'].token });
                        this.objectStorage.setUser_session(JSON.stringify(response.user))
                        this.objectStorage.setClient_token(response['result'].token);
                        resolve(response);
                        this.zone.run(() => {
                            this.gotoCases(response);
                        });
                    } else {
                        reject(response);
                    }
                });
            });

        });
    }


    // todo later
    public logOut() {
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then((gapi) => {
                gapi.auth2.getAuthInstance().signOut().then(() => {
                    localStorage.clear();
                    sessionStorage.clear();
                    this.router.navigate(['/login']);
                })
            });
        }).catch((err) => {
            console.log(JSON.stringify(err));
        });
    }


    public singUp(obj: DRequestDTO) {
        return new Promise<any>((resolve, reject) => {
            this.googleApiService.GetClient().then((gapi) => {
                gapi.client.duserendpoint.signup(obj).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }

    public forgotPassword(forgotForm: FormGroup) {
        return new Promise<any>((resolve, reject) => {
            this.googleApiService.GetClient().then((gapi) => {
                gapi.client.duserendpoint.forgetPassword({ "username": forgotForm.value.email }).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })

    }


    public resetPassword(forgotForm: FormGroup) {
        return new Promise<any>((resolve, reject) => {
            this.googleApiService.GetClient().then((gapi) => {
                gapi.client.duserendpoint.resetPassword({ "uuid": forgotForm.value.uuid, "password": forgotForm.value.newPassword }).execute((response) => {
                    this.processResponses(response, resolve, reject);
                })
            })
        }).catch(err => {
            this.populateDialog(err);
        })
    }

    public validateCaptcha(token: String) {

        return new Promise<any>((resolve, reject) => {
            this.googleApiService.GetClient().then((gapi) => {
                gapi.client.duserendpoint.validateCaptcha({ "token": token}).
                    execute((response) => {
                        this.processResponses(response, resolve, reject);
                    })
                })
            }).catch(err => {
                this.populateDialog(err);
            });
    }


    // google login
    public googleSignin(event) {
        this.googleAuthenticate().then((gapi) => {
            var localService = this;
            gapi.client.duserendpoint.authenticate().execute((result) => {
                this.objectStorage.setUser_session(JSON.stringify(result));
                localService.zone.run(() => {
                    localService.gotoCases(result);
                });
            }, (err) => {
            });
        });
    }


    public gotoCases(user: any) {
        console.log("LOGIN USER " + JSON.stringify(user));

        if (!(user["admin"] || user["canManageClientBridge"])) {

            this.toastShow(user);
            this.router.navigate(['app']);

        } else {
            this.toastShow(user);
            this.router.navigate(['admin']);
        }
    }

    public toastShow(user: any) {
        new Promise<any>((res, rej) => {
            this.toast.open("Welcome", user['firstName'], { duration: 4000, });
        });

    }



    // fetch the refresh data
    public loadUser(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.authenticate().then(gapi => {
                gapi.client.duserendpoint.authenticate().execute((response) => {
                    this.processResponses(response, resolve, reject);
                });
            })
        })
    }

    public getAdminData(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (this.objectStorage.getAdminData()) {
                resolve(this.objectStorage.getAdminData());
            } else {
                this.loadUser().then(response => {
                    if (response) {
                        this.objectStorage.setAdminData(response);
                        resolve(this.objectStorage.getAdminData());
                    }
                })
            }
        }).catch(err => {
            this.populateDialog(err);
        })
    }
}