import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APPCONFIG } from '../../config';
import { Duser } from '../../model/duser.model';
import { UtilService } from '../../services/util.service';
import { Account } from '../../model/dAccount';
import { ObjectStorage } from '../../model/objectStorage';
import { SessionFilter } from '../../shared/session.filter';

@Component({
    selector: 'my-app-sidenav',
    styles: [],
    templateUrl: './sidenav.component.html'
})

export class AppSidenavComponent {
    AppConfig;

    public dUser: Duser;
    private dAccount: Account;
    public logoImage: String = 'http://www.mango.org/Mangos/media/Media/Images/Header%20Images/facts.jpg';
    private objectStorage: ObjectStorage;
    private productLink;

    constructor(private utilService: UtilService, private router: Router) {
        this.objectStorage = ObjectStorage.getInstance();
        if (!this.objectStorage.getUser_session().code) {
            this.AppConfig = APPCONFIG;
            this.dUser = this.objectStorage.getUser_session();
            this.dAccount = this.dUser['account'];
            this.productLink = (this.dAccount.customUrl) ? this.dAccount.customUrl : this.AppConfig.productLink
            this.utilService.firmChangeEmiited$.subscribe(logo => {
                this.logoImage = (logo != null) ? logo : this.AppConfig.firmLogoCB;
            });

        } else {
            this.objectStorage.clearStorage();
            this.router.navigate(["\login"]);
        }
    }


    toggleCollapsedNav() {
        this.AppConfig.navCollapsed = !this.AppConfig.navCollapsed;
    }
}
