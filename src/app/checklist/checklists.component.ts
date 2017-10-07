import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import { LoadingService } from '../loading/loading.service';
import { DTask } from '../model/dTask';
import { Duser } from '../model/duser.model';
import { DContactcacheEndpointService } from '../services/dcontactcache.endpoint.service';
import { DTaskEndpointService } from '../services/dtask.endpoint.service';
import { MdSnackBar, MdDialog } from '@angular/material';
import { ObjectStorage} from '../model/objectStorage';

@Component({
    selector: 'check-list',
    templateUrl: './checklists.component.html',
    styleUrls: ['../layout/layout.component.css']
})


export class CheckListComponent {

    private title: String;
    private subtitle: String;
    private dtasks: Array<DTask>;
    private objectStorage:ObjectStorage;
    constructor(private toast: MdSnackBar, private taskService: DTaskEndpointService, private utilService: UtilService, private contactCacheService: DContactcacheEndpointService, private loadingService: LoadingService) {
        this.title = "Checklists";
        this.subtitle = "Complete the items in each list";
        this.loadingService.start();
        this.objectStorage = ObjectStorage.getInstance();
        let contactId = this.objectStorage.getUser_session().dContact;
        this.contactCacheService.getDContactCache(contactId) .then(res => {
            this.dtasks = res.tasks;
            this.loadingService.complete();
        })

    }



    private onCheckedItem(obj: DTask, index: any) {
        // toggle the state
        let isChecked = obj.tasks[index].done;
        isChecked = !isChecked;
        obj.tasks[index].done = isChecked;
        this.taskService.saveTask(obj).then(res => {});
    }
}