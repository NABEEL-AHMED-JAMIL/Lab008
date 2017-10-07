import { Component, OnInit } from '@angular/core';
import { Matter } from '../../model/dmatter';
import { MatterDetail } from '../../model/dmatter.detail';
import { DMatterEndpointService } from '../../services/dmatter.endpoint.service';
import { DTaskEndpointService } from '../../services/dtask.endpoint.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Duser } from '../../model/duser.model';
import { ObjectStorage } from '../../model/objectStorage';
import { LayoutService } from '../../layout/layout.service';
import { UtilService } from '../../services/util.service';




@Component({
    selector: 'selected-case',
    templateUrl: './selected-case.component.html',
    styleUrls: ['../../layout/layout.component.css']
})
export class SelectedCaseComponent {

    private selectedItem: Matter;
    private receiptNumber: MatterDetail;
    private objectStorage: ObjectStorage;
    private allItems: any[];

    constructor(
        private activeRoute: ActivatedRoute,
        private service: DMatterEndpointService,
        private taskService: DTaskEndpointService,
        private loadingService: LayoutService,
        private utilService: UtilService) {
        this.objectStorage = ObjectStorage.getInstance();
        this.loadingService.updatePreloaderState('active');
        this.allItems = this.objectStorage.getData();
        this.allItems.filter((item: any) => {
            if (item.id == this.activeRoute.snapshot.params.id) {
                this.selectedItem = item;
            }
        });
        this.service.getMatterDetails(this.selectedItem).then((res) => {
            this.receiptNumber = res;
            // refresh the side nav---->
            this.loadingService.updatePreloaderState('hide');
        });


    }


    public updateTask(event: any, id: number) {
        this.taskService.updateDTask(id, event.checked).then((res) => {
            // do something with response
        });
    }

}
