import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DUserEndpointService } from '../../services/duser.endpoint.service';
import { DAccountEndpointService } from '../../services/daccountendpoint.service';

import { AlertService } from '../../services/alert.service';
import { AbstractControl } from '@angular/forms';
import { PasswordValidation } from './reset-password.validator';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LayoutService } from '../../layout/layout.service';

@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    providers: [PasswordValidation, LayoutService]

})

export class ResetPasswordComponent {

    resetForm: FormGroup;
    newPassword = new FormControl("", [Validators.required]);
    repeatePassword = new FormControl(null, [Validators.required]);
    uuid = null;
    private account: any;

    constructor(
        private dAccountendpoint: DAccountEndpointService,
        private authService: DUserEndpointService,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private loadingService: LayoutService) {
        // read parameter from url
        //this.uuid = this.activatedRoute.snapshot.queryParams.uuid;
       
        this.dAccountendpoint.loadTheme(localStorage.getItem('accountIdParam')).then(res => {
            this.account = res;
        });

    }

    ngOnInit() {
        this.buildForm();
    }


    private buildForm() {
        this.resetForm = this.formBuilder.group({
            newPassword: this.newPassword,
            repeatePassword: this.repeatePassword,
            uuid: this.uuid
        }, {
                // apply validation on both password fields
                validator: PasswordValidation.MatchPassword
            });
    }

    public onSubmit() {
        this.loadingService.updatePreloaderState('active');
        this.authService.resetPassword(this.resetForm).then((res) => {
            this.loadingService.updatePreloaderState('hide');
            // this.router.navigate(['/login'], { queryParams: { p: 'success' } })
            this.router.navigate(['/login', localStorage.getItem('accountIdParam')]);
        }).catch((err) => {
            this.loadingService.updatePreloaderState('hide');
            this.alertService.error(err['message'].split(':')[1]);
        });;
    }

}
