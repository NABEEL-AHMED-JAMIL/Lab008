import { Component } from '@angular/core';
import { DContactcacheEndpointService } from '../../../services/dcontactcache.endpoint.service';
import { UtilService } from '../../../services/util.service';
import { DTaskEndpointService } from '../../../services/dtask.endpoint.service';
import { ContactCache } from '../../../model/dContactCache';
import { DTask } from '../../../model/dTask';
import { ObjectStorage } from '../../../model/objectStorage';
import { Message } from '../../../shared/messages';
import { RichText } from '../../../rich-text/rich-text.component';
import { MdSnackBar, MdDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'edit-checklist',
    templateUrl: './edit-checklist.component.html',
    styleUrls: ['../../admin.component.css']
})


export class EditChecklistComponent {

    private title: String;
    private subtitle: String;
    private contactCahe: ContactCache;
    private taskTitle: String;
    private taskDescription: String;
    private selectedTask: DTask;
    private taskId: number;
    private message: Message;
    private path: String;
    private objectStorage: ObjectStorage;

    constructor(private utilService: UtilService, private router: Router, private toast: MdSnackBar, private contacCacheService: DContactcacheEndpointService, private dialog: MdDialog, private activateRoute: ActivatedRoute, private taskService: DTaskEndpointService) {
        this.title = "Edit Checklist";
        this.subtitle = "Use the form below to add, edit, or remove items";
        this.path = "/admin/selecteduser";
        this.message = new Message();
        this.objectStorage = ObjectStorage.getInstance();
        this.contacCacheService.geteContact().then(response => {
            this.taskId = this.activateRoute.snapshot.params.q;
            this.contactCahe = response;
            this.contactCahe.tasks.filter(obj => {
                if (obj.id == this.taskId) {
                    // deep copy object for break binding
                    this.selectedTask = Object.assign({}, obj)
                    // deep copy array for break binding
                    this.selectedTask.tasks = new Array();
                    if (obj.tasks) {
                        obj.tasks.forEach((taskItem) => { this.selectedTask.tasks.push(Object.assign({}, taskItem)); })
                    }
                }
            })
        });

    }

    private editChecklist(task: DTask): void {
        let dlg = this.dialog.open(RichText, { width: '600px', });
        dlg.componentInstance.content = task.task;
        dlg.afterClosed().subscribe((result) => {
            // update the task
            (result[0] == 'PROCEED') ? task.task = result[1] : "";
        });
    }

    private onAddItem(): void {
        let dlg = this.dialog.open(RichText, { width: '600px', });
        dlg.afterClosed()
            .subscribe((result) => {
                if (result[0] == 'PROCEED') {
                    // update the task
                    let taskItem = new DTask();
                    taskItem.task = result[1].replace("<p>", "").replace("</p>", "");
                    (!this.selectedTask.tasks) ? this.selectedTask.tasks = new Array<DTask>() : "";
                    this.selectedTask.tasks.push(taskItem);
                }
            });

    }


    private onRemoveItem(index: any): void {
        let dialogs = this.utilService.openDialouge(this.dialog, "Delete Item", "Are you sure you want to delete?", "Yes", "No");
        dialogs.afterClosed().subscribe((result) => {
            (result == 'PROCEED') ? this.selectedTask.tasks.splice(index, 1) : "";
        });

    }

    private onDeleteTaskSet(): void {
        if (this.taskId) {
            let dialogs = this.utilService.openDialouge(this.dialog, "Delete Taskset", "Are you sure you want to delete?", "Yes", "No");
            dialogs.afterClosed().subscribe((result) => {
                if (result == 'PROCEED') {
                    this.taskService.deleteTask(this.taskId).then(res => {
                        this.router.navigate([this.path]);
                    });
                }
            });
        }
    }


    private onSave(): void {
        this.taskService.saveTask(this.selectedTask)
            .then(response => {
                console.log(response);
                this.contactCahe.tasks.filter((obj, index) => {
                    (obj.id == this.taskId) ? this.contactCahe.tasks[index] = this.selectedTask : "";
                })
                // update the object
                this.objectStorage.setContactCache(this.contactCahe);
                this.toast.open("Task", this.message.save, {
                    duration: 4000,
                });

            })
    }

}