import { Injectable } from '@angular/core';
import { ObjectStorage } from '../model/objectStorage';
import { Settings } from '../model/dSettings';
import { APPCONFIG } from '../config';

@Injectable()
export class HeaderService {

    protected objectStorage: ObjectStorage;
    protected appConfig: Settings;
    public constructor() {
        this.objectStorage = ObjectStorage.getInstance();
    }


    public getAppConfig() {
        if (this.objectStorage.getUser_session().account && this.objectStorage.getUser_session().account.settings) {
            return this.objectStorage.getAppConfig(this.objectStorage.getUser_session().account.settings);
        } else {
            this.appConfig = APPCONFIG;
            return this.objectStorage.getAppConfig(this.appConfig);
        }

    }

   



}

