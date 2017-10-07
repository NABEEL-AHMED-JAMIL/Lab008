import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilService } from '../../../services/util.service';
import { Router } from '@angular/router';
import { DContactcacheEndpointService } from '../../../services/dcontactcache.endpoint.service';
import { QuestionnaireService } from '../../../services/questionnaire.service';
import { ContactCache } from '../../../model/dContactCache';
import { Duser } from '../../../model/duser.model';
import { ObjectStorage } from '../../../model/objectStorage';
import { SessionFilter } from '../../../shared/session.filter';
import { LoadingService } from '../../../loading/loading.service';
import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'my-app-sidenav-menu',
    //styleUrls: ['./sidenav-menu.component.css'],
    templateUrl: './sidenav-menu.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush

})

export class AppSidenavMenuComponent {


    public folderId: string;
    public openStatus: Observable<any>;
    private visibleStatus: boolean = false;
    private dUser: Duser;
    private contactCach: ContactCache;
    private objectStorage: ObjectStorage;

    constructor(private utilService: UtilService, private contactCacheService: DContactcacheEndpointService, private router: Router, protected loadingService: LoadingService) {
        this.objectStorage = ObjectStorage.getInstance();
        if (!this.objectStorage.getUser_session().code) {
            this.dUser = this.objectStorage.getUser_session();
            this.utilService.loadTheme();
            // if user is of not admin type
            (!(this.dUser["canManageClientBridge"] || this.dUser["admin"])) ?
                this.openStatus = this.contactCacheService.getOpenStatus(this.dUser["dContact"]) : "";
            this.utilService.changeEmitted$.subscribe(folderId => {
                this.folderId = folderId;
            });
        } else {
            this.objectStorage.clearStorage();
            this.router.navigate(["\login"]);
        }
    }
}
