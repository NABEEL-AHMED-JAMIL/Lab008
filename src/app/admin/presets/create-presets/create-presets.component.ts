import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar, MdDialog } from '@angular/material';
import { AssignQuestionDialog } from './../../../confirm-dialog/assign-question-dialog/assign-question-dialog.component'
import { AssignCheckListDialog } from './../../../confirm-dialog/assign-checklist-dialog/assign-checklist-dialog.component'
import { DQuestion, QUESTIONNAIRES } from '../../../model/dQuestion';
import { ObjectStorage } from '../../../model/objectStorage';
import { ContactCache } from '../../../model/dContactCache';
import { DTask } from '../../../model/dTask';
import { UtilService } from '../../../services/util.service';
import { DUserEndpointService } from '../../../services/duser.endpoint.service';
import { DAccountEndpointService } from '../../../services/daccountendpoint.service';
import { Presets } from '../../../model/dPresets';
import { Message } from '../../../shared/messages';

@Component({
    selector: 'admin-create-presets',
    templateUrl: './create-presets.component.html',
    styleUrls: ['../../admin.component.css']
})

export class CreatePresetsComponent {

    private title: String;
    private subtitle: String;
    private filteredQuestionnaires: Array<DQuestion>;
    private filteredChecklist: Array<DTask>;
    private objectStorage: ObjectStorage;
    private adminData: ContactCache;
    private preset: Presets;
    private message: Message;

    constructor(private dAccountendpoint: DAccountEndpointService, private toast: MdSnackBar, private activeRouter: ActivatedRoute, private router: Router, private utilService: UtilService, private dialog: MdDialog, private userEndpointService: DUserEndpointService) {
        this.title = 'Manage Preset';
        this.subtitle = 'Use the form below to list questionnaires and checklists in your preset';
        this.objectStorage = ObjectStorage.getInstance();
        this.adminData = Object.assign({}, this.objectStorage.getUser_session());
        this.message = new Message();
        if (this.activeRouter.snapshot.params.q) {
            this.loadPreset(this.activeRouter.snapshot.params.q).then(res => {
                this.preset = res;
                this.preset.checklists = (this.preset.checklists != null) ? this.preset.checklists : new Array();
                this.preset.questionnaires = (this.preset.questionnaires != null) ? this.preset.questionnaires : new Array();
                // release the object
                this.objectStorage.setData(null);
            });
        } else {
            this.preset = new Presets();
        }
    }

    // Add questionnaire
    public onAddQuestionnaire(): void {
        this.filteredQuestionnaires = new Array();
        //  custom questionnaire
        if (this.adminData.account.questionnaires) {
            this.adminData.account.questionnaires.filter((obj, index) => {
                (!this.isQuestionnaireExist(obj)) ? this.filteredQuestionnaires.push(obj) : "";
            })
        }
        //  static questionnaire
        QUESTIONNAIRES.filter((obj, index) => {
            // as thay are holding by name so title will be name (enum)
            obj.title = obj.name;
            (!this.isQuestionnaireExist(obj)) ? this.filteredQuestionnaires.push(obj) : "";
        });

        let dlg = this.utilService.openQuestionnaireAssigneDialouge(this.dialog, "Add Questionnaire", this.filteredQuestionnaires, "Add", "Cancel");
        dlg.afterClosed().subscribe((result) => {
            (result.action == 'SAVE') ? this.preset.questionnaires.push(result.value) : "";
        });

    }

    public onRemoveQuestionnaire(ques: DQuestion): void {
        let dialogs = this.utilService.openDialouge(this.dialog, "Delete Item", "Are you sure?", "Yes", "No");
        dialogs.afterClosed().subscribe((result) => {
            (result == 'PROCEED') ?
                this.preset.questionnaires.filter((obj, index) => {
                    (obj.id && obj.id == ques.id) ? this.preset.questionnaires.splice(index, 1) : "";
                    (!obj.id && obj.title == ques.title) ? this.preset.questionnaires.splice(index, 1) : "";
                }) : "";

        })
    }

    public onAddChecklist(): void {
        this.filteredChecklist = new Array();
        this.adminData.account.taskSets.filter((obj, index) => {
            (!this.isChecklistExist(obj)) ? this.filteredChecklist.push(obj) : "";
        });
        let dlg = this.utilService.openChecklistAssigneDialouge(this.dialog, "Add Checklist", this.filteredChecklist, "Add", "Cancel");
        dlg.afterClosed().subscribe((result) => {
            (result.action == 'SAVE') ? this.preset.checklists.push(result.value) : "";
        });

    }

    public onRemoveChecklist(task: DTask): void {
        let dialogs = this.utilService.openDialouge(this.dialog, "Delete Item", "Are you sure you want to delete?", "Yes", "No");
        dialogs.afterClosed().subscribe((result) => {
            (result == 'PROCEED') ?
                this.preset.checklists.filter((obj, index) => {
                    (obj.id == task.id) ? this.preset.checklists.splice(index, 1) : "";
                }) : "";

        })
    }


    private isQuestionnaireExist(ques: DQuestion): Boolean {
        let flag = false;
        // list of preset question
        this.preset.questionnaires.filter(obj => {
            (obj.id && obj.id == ques.id) ? flag = true : "";
            (!obj.id && obj.title == ques.title) ? flag = true : "";
        });
        return flag;
    }


    private isChecklistExist(task: DTask): Boolean {
        let flag = false;
        // list of preset checklist
        this.preset.checklists.filter(obj => {
            (obj.id == task.id) ? flag = true : "";
        });
        return flag;
    }

    private onSave() {
        this.dAccountendpoint.savePreset(this.preset).then(res => {
            if (res) {
                this.toast.open("Preset", this.message.save, { duration: 4000, });
                this.router.navigate(['/admin/presets']);
            }
        })

    }

    private onCancel() {
        this.router.navigate(['/admin/presets']);
    }

    private loadPreset(presetId: any): Promise<any> {
        return new Promise((resolve, reject) => {
            (this.objectStorage.getData() != null) ?
                resolve(this.objectStorage.getData()) :
                this.dAccountendpoint.getPresets().then(res => {
                    // get preset object base on param id
                    let presetObject;
                    (res.items != null) ?
                        res.items.filter(obj => { (obj.id == presetId) ? presetObject = obj : ""; }) : "";
                    resolve(presetObject);
                })
        });
    }
}
