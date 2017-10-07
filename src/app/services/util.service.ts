import { Injectable } from '@angular/core';
import { DApiAuthToken } from '../model/dApiAuthToken';
import { Duser } from '../model/duser.model';
import { Account } from '../model/dAccount';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { APPCONFIG } from '../config';
import { MdSnackBar, MdDialog } from '@angular/material';
import { ConfirmDialog } from '../confirm-dialog/confirmDialog.component';
import { MessageConfirmDialog } from '../confirm-dialog/messageDialog.component';
import { InfoDialog } from '../confirm-dialog/info-dialog/info-dialog.component';
import { AssignQuestionDialog } from '../confirm-dialog/assign-question-dialog/assign-question-dialog.component';
import { AssignCheckListDialog } from '../confirm-dialog/assign-checklist-dialog/assign-checklist-dialog.component';
import { AssignPresetDialog } from '../confirm-dialog/assign-preset-dialog/assign-preset-dialog.component';
import { ContactCache } from '../model/dContactCache';
import { DTask } from '../model/dTask';

@Injectable()
export class UtilService {

    public token: DApiAuthToken;
    private duser: Duser;
    // contact cahce
    private contactCache: ContactCache;
    // tasks
    private tasks: Array<DTask>;
    // get folder id and emite to the side bar
    private folderId = new Subject<any>();
    private fold: string;
    public changeEmitted$ = this.folderId.asObservable();

    private firmLogoCB = new Subject<any>();
    public firmChangeEmiited$ = this.firmLogoCB.asObservable();

    public  openStatus:BehaviorSubject<any>;

    constructor() {
        this.openStatus = new BehaviorSubject<any>(0);
    }


    // change the date
    public dateChange(date) {
        if (date != null) {
            var myDate = new Date();
            myDate.setTime(date);
            return (myDate.getMonth() + 1) + '/' + myDate.getDate() + '/' + myDate.getFullYear();
        }
        return;
    }

    // formate  the date  yyyy-mm-dd
    public formateDate(dateObj): String {
        var myDate = new Date();
        myDate.setTime(dateObj);
        // add +1 for show proper month
        let month: String = (myDate.getMonth() + 1) + "";
        let date: String = myDate.getDate() + ""
        // if length of month and date is 1 then append 0 on left side 
        month = (month.length == 1 ? month = "0" + month : month);
        date = (date.length == 1 ? date = "0" + date : date);
        return (myDate.getFullYear()) + '-' + month + '-' + date;
    }


    // change the color
    public statusColor(result) {
        if (result == "Open") {
            return "#009688";
        } else if (result == "Pending") {
            return "#FFC200";
        } else {
            return "gray";
        }
    }

    // set the local-sign in
    public setLocalSignToken(auth: DApiAuthToken) {
        this.token = auth;
    }

    // get the local-sign
    public getLocalSignToken() {
        return this.token;
    }


    public setDcontactCache(contactCache: ContactCache) {
        this.contactCache = contactCache;
        this.setTasks(this.contactCache.tasks);
        this.setFolderID(this.contactCache.folderId);
    }


    
    // set the user task
    public setTasks(tasks: Array<DTask>) {
        this.tasks = tasks;
    }

    public getTasks(): any {
        return this.tasks;
    }


    public setFolderID(folderId: string): any {
        this.fold = folderId;
        this.folderId.next(folderId);
    }

    public getFolderId() {
        return this.fold;
    }

    public setfirmLogoCB(firmLogoCB: string): any {
        console.log("IMAGE SET" + firmLogoCB);
        this.firmLogoCB.next(firmLogoCB);
    }

    public loadTheme(): void {
        if (sessionStorage.getItem("signin_user")) {
            let user: Duser = JSON.parse(sessionStorage.getItem("signin_user"));
            if (user["account"] != null) {
                if (user["account"].settings) {
                    APPCONFIG.brand = 'Material';
                    APPCONFIG.layoutBoxed = false;
                    APPCONFIG.navCollapsed = false;
                    APPCONFIG.navBehind = true;
                    APPCONFIG.fixedHeader = true;
                    APPCONFIG.sidebarWidth = 'large';
                    APPCONFIG.theme = 'light';
                    APPCONFIG.colorOption = user["account"].settings.colorOption.toString();
                    APPCONFIG.AutoCloseMobileNav = true;
                    this.setfirmLogoCB(user["account"].firmLogoCB);

                }
            }
        }
    }

    public openInfoDialouge(dialog: MdDialog, title: String, content: String, buttonTitle: String): any {
        let dlg = dialog.open(InfoDialog);
        dlg.componentInstance.title = title;
        dlg.componentInstance.content = content;
        dlg.componentInstance.buttonTitle = buttonTitle;
        return dlg;
    }

    public openMessageDialouge(dialog: MdDialog, data: String, width: string, title: String, yes: String, no: String): any {
        let dlg = dialog.open(MessageConfirmDialog, {width: width,});
        dlg.componentInstance.title = title;
        dlg.componentInstance.cancelButtonTitle = no;
        dlg.componentInstance.saveButtonTitle = yes;
        dlg.componentInstance.data = {
            value: data,
            action: 'UPDATE'
        };
    }


    public openDialouge(dialog: MdDialog, title: String, content: String, yes: String, no: String): any {
        let dlg = dialog.open(ConfirmDialog);
        dlg.componentInstance.title = title;
        dlg.componentInstance.content = content;
        dlg.componentInstance.proceedButtonTitle = yes;
        dlg.componentInstance.cancelButtonTitle = no;
        return dlg;

    }


    public openQuestionnaireAssigneDialouge(dialog: MdDialog, title: String, list: any, save: String, cancel: String): any {
        let dlg = dialog.open(AssignQuestionDialog, {width: '600px',});
        dlg.componentInstance.title = title;
        dlg.componentInstance.cancelButtonTitle = cancel;
        dlg.componentInstance.saveButtonTitle = save;
        dlg.componentInstance.questionnaires = list;
        dlg.componentInstance.data = {
            value: null,
            action: 'SAVE'
        };

        return dlg;
    }

    public openChecklistAssigneDialouge(dialog: MdDialog, title: String, list: any, save: String, cancel: String): any {
        let dlg = dialog.open(AssignCheckListDialog, {width: '600px',});
        dlg.componentInstance.title = title;
        dlg.componentInstance.cancel = cancel;
        dlg.componentInstance.save = save;
        dlg.componentInstance.taskSet = list;
        dlg.componentInstance.data = {
            value: null,
            action: 'SAVE'
        };

        return dlg;
    }

    public openPresetAssigneDialouge(dialog: MdDialog, title: String, list: any, save: String, cancel: String): any {
        let dlg = dialog.open(AssignPresetDialog, {width: '600px',});
        dlg.componentInstance.title = title;
        dlg.componentInstance.cancel = cancel;
        dlg.componentInstance.save = save;
        dlg.componentInstance.presets = list;
        dlg.componentInstance.data = {
            value: null,
            action: 'SAVE'
        };

        return dlg;
    }

    public  setOpenStatus(value){
        this.openStatus.next(value);
    }
}