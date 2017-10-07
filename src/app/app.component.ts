import { Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { APPCONFIG } from './config';
import { LayoutService } from './layout/layout.service';
// import { LoadingService } from './loading/loading.service';
// import {DUserEndpointService} from './services/duser.endpoint.service';
// import {AuthGuard} from './services/auth-guard.service';
// 3rd
import 'styles/font-awesome.scss';
import 'styles/material2-theme.scss';
import 'styles/bootstrap.scss';
// custom
import 'styles/layout.scss';
import 'styles/theme.scss';
import 'styles/ui.scss';
import 'styles/app.scss';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [LayoutService],
})
export class AppComponent implements OnInit{
    public AppConfig: any;
    constructor(private router: Router) { }

    ngOnInit() {
        this.AppConfig = APPCONFIG;

        // Scroll to top on route change
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            document.body.scrollTop = 0;
        });

    }

    
}
