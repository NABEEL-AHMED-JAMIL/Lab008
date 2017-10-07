import { Component } from '@angular/core';
import { DUserEndpointService } from '../../services/duser.endpoint.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { DApiAuthToken } from '../../model/dApiAuthToken';
import { Message } from '../../shared/messages';
import { LayoutService } from '../../layout/layout.service';
import { UtilService } from '../../services/util.service';
import { DAccountEndpointService } from '../../services/daccountendpoint.service';
import { MdSnackBar } from '@angular/material';
import { Duser } from '../../model/duser.model';
import { Account } from '../../model/dAccount';
import { Settings } from '../../model/dSettings';
import { ObjectStorage } from '../../model/objectStorage';
import { APPCONFIG } from '../../config';


@Component({
    providers: [Message],
    selector: 'mypagelogin',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class PageLoginComponent {

    public loginForm: FormGroup;
    public email = new FormControl(null, [Validators.required]);
    public password = new FormControl(null, [Validators.required]);
    public dApiAuthToken: DApiAuthToken;
    public duser: Duser;
    public google: String = '../assets/images/background/google.png';
    private account: Account;
    private message: any;
    public messages: Message;
    public objectStorge: ObjectStorage;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private authService: DUserEndpointService,
        private dAccountendpoint: DAccountEndpointService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private loadingService: LayoutService, private utilService: UtilService, private toast: MdSnackBar) {
        this.messages = new Message();
        this.objectStorge = ObjectStorage.getInstance();
        // initially clear storage
        this.objectStorge.clearStorage();
        if (this.route.snapshot.params.id) {
            this.objectStorge.setAccountIdParam_session(this.route.snapshot.params.id);
            this.dAccountendpoint.loadTheme(this.route.snapshot.params.id).then(res => {
                this.account = res;
            });
        }
    }



    ngOnInit() {
        this.buildForm();
    }

    private buildForm() {
        this.loginForm = this.formBuilder.group({
            email: this.email,
            password: this.password
        });
    }

    public handleSignInClick(event: any) {
        this.authService.googleSignin(event);
    }

    public onSubmit() {
        this.loadingService.updatePreloaderState('active');
        this.authService.login(this.loginForm).then((result) => {
            this.duser = result['result'].user;
            this.loadingService.updatePreloaderState('hide');
            new Promise<any>((res, rej) => {
                this.toast.open("Welcome", this.duser['firstName'], { duration: 4000, });
            });
        }).catch((err) => {
            $(".alert").remove();
            this.loadingService.updatePreloaderState('hide');
            this.message = err['message'].split(':')[1];
        });
    }

    public onSignup() {
        this.router.navigate(['/sign-up',this.objectStorge.getAccountIdParam_session()]);
    }
}
