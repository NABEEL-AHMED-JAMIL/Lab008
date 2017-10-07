import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DUserEndpointService } from '../../services/duser.endpoint.service';
import { AlertService } from '../../services/alert.service';
import { LayoutService } from '../../layout/layout.service';
import { Router } from '@angular/router';
import { DAccountEndpointService } from '../../services/daccountendpoint.service';


@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-passoword.component.css']
})

export class PageForgotPasswordComponent {


    forgotForm: FormGroup;
    private email = new FormControl(null, [Validators.required]);
    private show: Boolean = true;
    private error: Boolean = false;
    private account: any;

    constructor(private dAccountendpoint: DAccountEndpointService,
        private authService: DUserEndpointService, private formBuilder: FormBuilder, private router: Router,
        private alertService: AlertService, private loadingService: LayoutService) { 
             
        this.dAccountendpoint.loadTheme(localStorage.getItem('accountIdParam')).then(res => {
            this.account = res;
        });

    }

    ngOnInit() {
        this.buildForm();
    }

    private buildForm() {
        this.forgotForm = this.formBuilder.group({
            email: this.email
        });
    }

    public onSubmit() {
        this.loadingService.updatePreloaderState('active');
        this.authService.forgotPassword(this.forgotForm).then((res) => {
            this.loadingService.updatePreloaderState('hide');
            if(res){
                // show the message
                this.show = false;
            }else {
                this.show = true;
                this.router.navigate(['/login', localStorage.getItem('accountIdParam')]);
            }
            
        }).catch((err) => {

            this.loadingService.updatePreloaderState('hide');
            this.error = true;
            
            // this.alertService.error(err['message'].split(':')[1]);
        });
    }

    public goLogin(): any {
        this.router.navigate(['/login', localStorage.getItem('accountIdParam')]);
        // this.router.navigate(['/login'], { queryParams: { p: 'reset' } })
    }

}
