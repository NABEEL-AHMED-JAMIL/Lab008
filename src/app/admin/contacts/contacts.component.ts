import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ContactCache } from '../../model/dContactCache';
//----------------Service------------------------------
import { DContactcacheEndpointService } from '../../services/dcontactcache.endpoint.service';
import { UtilService } from '../../services/util.service';
import { LoadingService } from '../../loading/loading.service';
import { SessionFilter } from '../../shared/session.filter';
import { ObjectStorage } from '../../model/objectStorage';


@Component({
    selector: 'admin-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['../admin.component.css']
})

export class ContactsComponent {

    private searchMode: boolean = false;
    private contactCacheList: Array<ContactCache> = [];
    private result: any = 0;
    private objectStorage: ObjectStorage;
    // private sValue = null;
    sValue = new FormControl();
    constructor(private contactcacheService: DContactcacheEndpointService, protected router: Router,
        private utilService: UtilService, protected loadingService: LoadingService) {
        this.objectStorage = ObjectStorage.getInstance();
        this.sValue.valueChanges.debounceTime(1000).distinctUntilChanged().subscribe(sValue => {
            if (sValue != null && sValue.length > 0) {
                this.searchMode = true;
                this.contactcacheService.getFiltered(sValue).then((res) => {
                    this.contactCacheList = res["items"];
                    (this.contactCacheList != null && this.contactCacheList.length > 0) ?
                        this.result = this.contactCacheList.length : "";

                    this.searchMode = false;
                });
            }
        });
    }


    public onGetContact(value: any) {
        this.contactcacheService.getDContactCache(value).then((res) => {
            if (res) {
                // keep the state of object in session even page refreshed
                this.objectStorage.setSearchUserId_session(res.id);
                this.router.navigate(['/admin/selecteduser']);
            };
        });
    }
}