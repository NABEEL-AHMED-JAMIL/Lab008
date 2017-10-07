import { Component, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { DContactcacheEndpointService } from '../../services/dcontactcache.endpoint.service';
import { ContactCache } from '../../model/dContactCache';
import { DTask } from '../../model/dTask';

// openDialogWithAResult
@Component({
    selector: 'assign-checklist-dialog',
    templateUrl: './assign-checklist-dialog.component.html',

})
export class AssignCheckListDialog {

    public title: String;
    public cancel: String;
    public save: String;
    public adminContctCache: ContactCache;
    public taskSet: DTask[];
    public task: DTask;
    public data: {
        value: DTask;
        action: String;
    };
    constructor(public dialogRef: MdDialogRef<AssignCheckListDialog>) {
    }


}