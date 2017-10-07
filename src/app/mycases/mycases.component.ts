import { Component, OnInit } from '@angular/core';

// import the service
import { Matter } from '../model/dmatter';
import { FMatter } from '../model/fmatter';
import { DApiAuthToken } from '../model/dApiAuthToken';
import { Duser } from '../model/duser.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../services/util.service';
import { DMatterEndpointService } from '../services/dmatter.endpoint.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingService } from '../loading/loading.service';
import { MdSnackBar } from '@angular/material';
import { ObjectStorage } from '../model/objectStorage';


@Component({
    selector: 'my-cases',
    templateUrl: './mycases.component.html',
    styleUrls: ['../layout/layout.component.css', './mycases.component.css']
})


export class MyCasesComponent {

    private fmatter: FMatter;
    private dUser: Duser;
    private auth: DApiAuthToken;

    private allItems: Matter[];
    private title: String;
    private subtitle: String;
    private objectStorage: ObjectStorage;


    constructor(private activeRoute: ActivatedRoute, private animation: BrowserAnimationsModule, protected router: Router,
        private utilService: UtilService, private dMatterservice: DMatterEndpointService, private toast: MdSnackBar, protected loadingService: LoadingService) {
        this.loadingService.start();
        this.objectStorage = ObjectStorage.getInstance();
        this.dUser = this.objectStorage.getUser_session();
        this.title = "My Cases";
        this.subtitle = "View information about my cases";
        this.allItems = new Array();
        if (!this.dUser['accountId']) {
            this.fmatter = new FMatter(true, this.dUser['user'].accountId + '~' + this.dUser['user'].dContact, true, false);
        } else {
            this.fmatter = new FMatter(true, this.dUser['accountId'] + '~' + this.dUser['dContact'], true, false);
        }
        this.dMatterservice.getFiltered(this.fmatter).then((res) => {
            if (res.items) {
                this.allItems = res.items;
                this.objectStorage.setData(this.allItems)
            }
            this.loadingService.complete();
            // used the snake bar
        });

    }



    onSelect(id: number): void {
        this.title = null;
        this.subtitle = null;
        this.router.navigate(['/app/mycases/selected-case', id]);

    }


}
