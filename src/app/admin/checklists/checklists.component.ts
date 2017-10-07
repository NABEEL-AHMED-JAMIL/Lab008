import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DContactcacheEndpointService } from '../../services/dcontactcache.endpoint.service';
import { DUserEndpointService } from '../../services/duser.endpoint.service';
import { DTaskEndpointService } from '../../services/dtask.endpoint.service';
import { UtilService } from '../../services/util.service';
import { LoadingService } from '../../loading/loading.service';
import { ContactCache } from '../../model/dContactCache';
import { DTask } from '../../model/dTask';
import { ObjectStorage } from '../../model/objectStorage';
import { Message } from '../../shared/messages';
import { MdSnackBar, MdDialog } from '@angular/material';

@Component({
    selector: 'admin-checklist',
    templateUrl: './checklists.component.html',
    styleUrls: ['../admin.component.css']
})

export class ChecklistComponent {

    private adminData: ContactCache;
    private message: Message;
    private objectStorage: ObjectStorage;
    constructor(private loadingService: LoadingService, private toast: MdSnackBar, private utilService: UtilService, private dialog: MdDialog, private userEndPoint: DUserEndpointService, private contacCacheService: DContactcacheEndpointService, private router: Router, private taskService: DTaskEndpointService) {
        this.message = new Message();
        this.objectStorage = ObjectStorage.getInstance();
        let contactId = JSON.parse(sessionStorage.getItem("signin_user")).dContact;
        this.loadingService.start();
        this.userEndPoint.getAdminData().then(res => {
            (res) ? this.adminData = res : "";
            this.loadingService.complete();
        })
    }
    // todo slice 
    public onDeleteChecklist(task: DTask): void {
        let dialogs = this.utilService.openDialouge(this.dialog, "Delete Task", "Are you sure you want to delete?", "Yes", "No");
        dialogs.afterClosed().subscribe((result) => {
            if (result == 'PROCEED') {
                this.taskService.deleteTask(task.id).then(response => {
                    this.toast.open("Checklist", this.message.delete, {duration: 4000,});
                    this.adminData.account.taskSets.filter((obj, index) => {
                        (obj.id == task.id) ? this.adminData.account.taskSets.splice(index, 1) :"";
                    });
                    // update the  object
                    this.objectStorage.setAdminData(this.adminData);
                });
            }

        });

    }
    public onCreateChecklist(): void {
        this.router.navigate(['admin/createchecklist']);

    }

    public onEditCheckList(taskId: any): void {
        this.router.navigate(['admin/createchecklist', { q: taskId }]);
    }

}

