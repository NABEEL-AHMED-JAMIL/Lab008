import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DUserEndpointService } from '../../services/duser.endpoint.service';
import { DAccountEndpointService } from '../../services/daccountendpoint.service';
import { AlertService } from '../../services/alert.service';
import { LayoutService } from '../../layout/layout.service';
import { Router } from '@angular/router';
import { DRequestDTO } from '../../model/dRequestdto';
import { Message } from '../../shared/messages';
// captcha
import { ViewChild } from '@angular/core';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { Http, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';



const URL = 'https://www.google.com/recaptcha/api/siteverify';
const SECRET_KEY = "6LfHASwUAAAAANDi7c2xvJnJB6HNuBe1GJu4DzBX";

@Component({
    selector: 'my-page-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})

export class PageSignUpComponent {

    @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;
    private headers: Headers;
    public messages: Message = new Message();
    // , Validators.minLength(10)
    private dRequestDTO: DRequestDTO;
    private account: any;
    private message: any;
    private show: Boolean = true;
    private success: Boolean = true;
    private valid: Boolean = false;

    // null used for the value

    constructor(
        private dAccountendpoint: DAccountEndpointService,
        private http: Http,
        private authService: DUserEndpointService,
        private alertService: AlertService,
        private route: ActivatedRoute, private router: Router, private loadingService: LayoutService) {

        this.dRequestDTO = new DRequestDTO();
        (this.route.snapshot.params.id) ? localStorage.setItem('accountIdParam', this.route.snapshot.params.id) : "";
        this.dRequestDTO.accountId = parseInt(localStorage.getItem('accountIdParam'), 10)
        this.dAccountendpoint.loadTheme(this.dRequestDTO.accountId).then(res => {
            if (res) {
                this.account = res.result;
                // if extra inforation is available on url 
                (this.route.snapshot.params.accountId) ? this.dAccountendpoint.getRequest(this.route.snapshot.params.accountId)
                    .then(res => {
                        (res) ? this.dRequestDTO = res : "";
                    }) : "";

            }
        });
    }
    public onSubmit() {
        this.loadingService.updatePreloaderState('active');
        this.authService.singUp(this.dRequestDTO).then((res) => {
            this.loadingService.updatePreloaderState('hide');
            this.show = false;
            this.message = this.messages.signup;
        });
    }

    public handleCorrectCaptcha($event) {
        let token = this.captcha.getResponse();
        this.authService.validateCaptcha(token).then((response) => {
            this.success = response.success;
            (this.success) ? this.valid = true : "";
        });
    }


    public restCaptach() {
        this.success = true;
        this.captcha.reset();
    }

    public goLogin() {
        this.router.navigate(['/login', localStorage.getItem('accountIdParam')]);
    }
}
