import { APPCONFIG } from '../config';


export class ObjectStorage {

    private static objectStorage: ObjectStorage;
    private data: any;
    private contactCache: any;
    private adminData: any;
    private appConfig: any;
    private accountIdParam: any;
    private constructor() {
    }

    public static getInstance(): ObjectStorage {
        if (!ObjectStorage.objectStorage) {
            ObjectStorage.objectStorage = new ObjectStorage();
        }
        return ObjectStorage.objectStorage;
    }

    public getData() {
        return this.data;
    }
    public setData(data: any) {
        this.data = data;
    }

    public setContactCache(contactCache: any) {
        this.contactCache = contactCache;
    }

    public getContactCache() {
        return this.contactCache;
    }

    public setAdminData(adminData: any) {
        this.adminData = adminData;
    }

    public getAdminData() {
        return this.adminData;
    }

    public getUser_session(): any {
        return JSON.parse(sessionStorage.getItem("signin_user"));
    }

    public setUser_session(userJSon: any) {
        sessionStorage.setItem("signin_user", userJSon);
    }

    public getGapi_token() {
        return sessionStorage.getItem("gapi_token");
    }

    public setGapi_token(token: any) {
        sessionStorage.setItem("gapi_token", token);
    }

    public getClient_token() {
        return sessionStorage.getItem("client_token");
    }

    public setClient_token(token: any) {
        sessionStorage.setItem("client_token", token);
    }

    public getSearchUserId_session() {
        return JSON.parse(sessionStorage.getItem("search-user-id"));
    }

    public setSearchUserId_session(userId: any) {
        sessionStorage.setItem("search-user-id", userId);
    }

    public setAccountIdParam_session(accountId: any) {
        sessionStorage.setItem("accountIdParam", accountId);
    }

    public getAccountIdParam_session() {
        return  JSON.parse(sessionStorage.getItem("accountIdParam"));
    }

    public getAppConfig(settings: any): any {
        this.appConfig = settings;
        let obj = {
            'bg-color-light': ['11', '12', '13', '14', '15', '16', '21'].indexOf(this.appConfig.colorOption) >= 0,
            'bg-color-dark': this.appConfig.colorOption === '31',
            'bg-color-primary': ['22', '32'].indexOf(this.appConfig.colorOption) >= 0,
            'bg-color-success': ['23', '33'].indexOf(this.appConfig.colorOption) >= 0,
            'bg-color-info': ['24', '34'].indexOf(this.appConfig.colorOption) >= 0,
            'bg-color-warning': ['25', '35'].indexOf(this.appConfig.colorOption) >= 0,
            'bg-color-danger': ['26', '36'].indexOf(this.appConfig.colorOption) >= 0
        }
        return obj;
    }

    public clearStorage() {
        localStorage.clear();
        sessionStorage.clear();
        ObjectStorage.objectStorage = null;
    }



}