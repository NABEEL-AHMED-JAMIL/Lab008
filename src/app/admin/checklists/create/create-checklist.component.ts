import { Component } from '@angular/core';
import { DContactcacheEndpointService } from '../../../services/dcontactcache.endpoint.service';
import { DTaskEndpointService } from '../../../services/dtask.endpoint.service';
import { UtilService } from '../../../services/util.service';
import { ContactCache } from '../../../model/dContactCache';
import { DTask } from '../../../model/dTask';
import { ObjectStorage } from '../../../model/objectStorage';
import { Message } from '../../../shared/messages';
import { RichText } from '../../../rich-text/rich-text.component';
import { MdSnackBar, MdDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DUserEndpointService } from '../../../services/duser.endpoint.service';

@Component({
    selector: 'create-checklist',
    templateUrl: './create-checklist.component.html',
    styleUrls: ['../../admin.component.css']
})


export class CreateChecklistComponent {

    private title: String;
    private subtitle: String;
    private adminData: ContactCache;
    private taskTitle: String;
    private taskDescription: String;
    private taskItems: Array<DTask>;
    private task: DTask;
    private message: Message;
    private path: String = "/admin/checklists";
    private objectStorge: ObjectStorage;

    constructor(private utilService: UtilService, private activeRoute: ActivatedRoute, private toast: MdSnackBar, private userEndPointService: DUserEndpointService, private contacCacheService: DContactcacheEndpointService, private dialog: MdDialog, private activateRoute: ActivatedRoute, private taskService: DTaskEndpointService, private router: Router) {
        this.title = "Create New List";
        this.subtitle = "User the form below to add,edit, or remove items from the checklist.";
        this.message = new Message();
        this.objectStorge = ObjectStorage.getInstance();
        this.userEndPointService.getAdminData().then(response => {
            this.adminData = response;
            if (this.activateRoute.snapshot.params.q) {
                let taskId = this.activateRoute.snapshot.params.q;
                this.adminData.account.taskSets.filter(obj => {
                    if (obj.id == taskId) {
                        this.task = obj;
                        (!this.task.tasks) ? this.task.tasks = new Array() : "";
                    }
                })
            }
            if (!this.task) {
                this.task = new DTask();
                this.task.tasks = new Array();
            }
        });

    }

    private onAddItem(): void {
        let dlg = this.dialog.open(RichText, { width: '600px', });
        dlg.afterClosed().subscribe((result) => {
            if (result[0] == 'PROCEED') {
                // add new  the task list /sub task
                let item = new DTask();
                item.task = result[1];
                this.task.tasks.push(item);
            }
        });

    }


    private onRemoveItem(index: any): void {
        let dialogs = this.utilService.openDialouge(this.dialog, "Delete Item", "Are you sure you want to delete?", "Yes", "No");
        dialogs.afterClosed().subscribe((result) => {
            if (result == 'PROCEED') {
                this.adminData.account.taskSets.filter(task => {
                    (task.id == this.activateRoute.snapshot.params.q) ? task.tasks.splice(index, 1) : "";
                });
            }
        });
    }

    private onSave(): void {
        this.taskService.saveTask(this.task).then(response => {
            if (!this.task.id) {
                this.task = response.result;
                this.adminData.account.taskSets.push(this.task);
            }
            // update the user object
            this.objectStorge.setAdminData(this.adminData);
            this.toast.open("Task", this.message.save, {duration: 4000,});
            this.router.navigate(['admin/checklists']);

        })
    }

    private onEditItem(subTask: DTask, index: any): void {
        let dlg = this.dialog.open(RichText, { width: '600px', });
        dlg.componentInstance.content = subTask.task;
        dlg.afterClosed().subscribe((result) => {
            if (result[0] == 'PROCEED') {
                // add new  the task list /sub task
                let item = new DTask();
                item.task = result[1];
                this.task.tasks[index] = item;
            }
        });
    }
}
