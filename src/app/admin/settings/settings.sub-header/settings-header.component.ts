import { Component, Input } from '@angular/core';
import { APPCONFIG } from '../../../config';
import { HeaderService } from '../../../services/header.service';
import { Settings } from '../../../model/dSettings';
import { ObjectStorage } from '../../../model/objectStorage';
@Component({
    selector: 'settings-header',
    templateUrl: './settings-header.component.html',
    styleUrls: ['../../../layout/layout.component.css']
})
export class SettingsHeaderComponent {

    @Input()
    private title: String;
    @Input()
    private subtitle: String;

    @Input()
    private setting: Settings;

    private objectStorage: ObjectStorage;

    constructor() {
        this.objectStorage = ObjectStorage.getInstance();
    }


    public getAppConfig(setting: Settings): any {
        if (!this.setting) {
            return this.objectStorage.getAppConfig(this.objectStorage.getUser_session().account.settings);
        } else {
            this.setting = APPCONFIG;
            return this.objectStorage.getAppConfig(this.setting);
        }

    }


}
