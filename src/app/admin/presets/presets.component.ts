import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DUserEndpointService } from '../../services/duser.endpoint.service';
import { UtilService } from '../../services/util.service';
import { LoadingService } from '../../loading/loading.service';
import { Presets } from '../../model/dPresets';
import { Message } from '../../shared/messages';
import { ObjectStorage } from '../../model/objectStorage';
import { MdSnackBar, MdDialog } from '@angular/material';
import { DAccountEndpointService } from '../../services/daccountendpoint.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'admin-presets',
    templateUrl: './presets.component.html',
    styleUrls: ['../admin.component.css']
})

export class PresetsComponent {

    private presets: Array<Presets>;
    private objectStorage: ObjectStorage;
    private message: Message;

    constructor(private dAccountendpoint: DAccountEndpointService, private toast: MdSnackBar, private dialog: MdDialog, private utilService: UtilService, private router: Router, private loadingService: LoadingService, private userEndpointService: DUserEndpointService) {
        this.message = new Message();
        this.objectStorage = ObjectStorage.getInstance();
        this.loadingService.start();
        this.dAccountendpoint.getPresets().then(res => {
            this.presets = (res.items != null) ? res.items : new Array();
            this.loadingService.complete();
        })

    }

    private createPreset(): void {
        this.router.navigate(['/admin/createpresets']);
    }

    private editPreset(preset: Presets): void {
        this.objectStorage.setData(preset);
        this.router.navigate(['/admin/createpresets', { q: preset.id }]);
    }

    private onRremovePreset(presetId: any): void {
        let dialogs = this.utilService.openDialouge(this.dialog, "Delete Item", "Are you sure you want to delete?", "Yes", "No");
        dialogs.afterClosed().subscribe((result) => {
            if (result == 'PROCEED') {
                this.dAccountendpoint.removePreset(presetId).then(res => {
                    if (res) {
                        this.presets.filter((obj, index) => {
                            (obj.id == presetId) ? this.presets.splice(index, 1) : "";
                        })
                        this.toast.open("Preset", this.message.delete, { duration: 4000, })
                    }
                });

            }
        });

    }
}

