import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LollyService } from '../services/lolly.service';
import { Duser } from '../model/duser.model';
import { FormGroup } from '@angular/forms';
import { ContactCache } from './../model/dContactCache';
import { DContactcacheEndpointService } from '../services/dcontactcache.endpoint.service';
import { MdSnackBar, MdDialog } from '@angular/material';
import { ConfirmDialog } from '../confirm-dialog/confirmDialog.component';
import { Message } from '../shared/messages';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Questionnaire } from '../model/dQuestionnaire';
import { DQuestion, QUESTIONNAIRES } from '../model/dQuestion';
import { UtilService } from '../services/util.service';
import { SessionFilter } from '../shared/session.filter';
import { LoadingService } from '../loading/loading.service';
import { DQuestionnaireEndpoinService } from '../services/dquestionnaireendpoin.service';
import { ObjectStorage } from '../model/objectStorage';

@Injectable()
export class QuestionnaireService {
  protected message: Message;
  protected readOnly: boolean
  protected formStatus: String = "";
  protected data: ContactCache;;
  protected title: String;
  protected subtitle: String;
  protected utilService: UtilService;
  protected router: Router;
  protected showArrow: boolean;
  protected path: String;
  protected objectStorage: ObjectStorage;
  private sessionUser: any;
  protected isAdmin: boolean;
  protected states: Array<any> = ['AA', 'AE', 'AK', 'AL', 'AP', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'FM', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MN', 'MO', 'MP', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'PW', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'];
  protected buildingTypes: Array<any> = ['APT', 'STE', 'FLR'];
  constructor(protected toast: MdSnackBar, protected dialog: MdDialog,
    protected contactService: DContactcacheEndpointService,
    protected questionEndpointService: DQuestionnaireEndpoinService, protected formName: String) {
    this.showArrow = true;
    this.path = '/app/questionnaires';
    this.message = new Message();
    this.utilService = new UtilService();
    this.objectStorage = ObjectStorage.getInstance();
    this.sessionUser = this.objectStorage.getUser_session();
    this.isAdmin = this.sessionUser["admin"] || this.sessionUser["canManageClientBridge"] ? true : false;
  }


  protected loadData(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // if object stored in singleton object
      (this.objectStorage.getContactCache()) ?
        resolve(this.objectStorage.getContactCache()) :
        resolve(this.contactService.getDContactCache(this.objectStorage.getUser_session()["dContact"]));
    }).then(res => {
      (res && res.questionnaire) ? this.getFormStatus(res.questionnaire) : "";
      return res;
    });
  }


  // base on form status our form field and button status will be change
  protected getFormStatus(obj: Array<Questionnaire>): void {
    let statu: String = "Open";
    obj.filter(obj => {
      (obj.name == this.formName) ? status = obj.status.toString() : "";
    })
    if (!this.isAdmin && (status.toLocaleLowerCase() == 'approved' || status.toLocaleLowerCase() == 'submitted')) {
      this.readOnly = true;
      this.formStatus = status.toLocaleLowerCase();
    }
  }




  protected saveData(obj: ContactCache) {
    this.contactService.saveContactCache(obj)
      .then((res) => {
        (res) ? this.toast.open(this.formName.toString(), "Data saved successfully.", { duration: 5000, }) : "";
      })
  }

  protected savenSubmit(obj: ContactCache, readOnly: any): void {
    let dlg = this.utilService.openDialouge(this.dialog, this.message.questionnaireTitle, this.message.questionnaireSubmission, this.message.questionnaireConfirm, this.message.cancel);
    dlg.afterClosed().subscribe((result) => {
      if (result == 'PROCEED') {
        this.updateStatus(obj.questionnaire, this.formName, "Submitted");
        this.saveData(obj);
        this.readOnly = true;
        this.formStatus = 'Submitted';
      }
    });
  }

  // custome form save 
  protected saveDataCustom(obj: DQuestion) {
    this.questionEndpointService.saveDQuestionnaireSet(obj)
      .then((res) => {
        this.toast.open(this.formName.toString(), "Data saved successfully.", { duration: 5000, });
      });
  }

  // custome form save&submit
  protected savenSubmitCustom(obj: ContactCache, readOnly: any) {
    let dlg = this.utilService.openDialouge(this.dialog, this.message.questionnaireTitle, this.message.questionnaireSubmission, this.message.questionnaireConfirm, this.message.cancel);
    dlg.afterClosed().subscribe((result) => {
      if (result == 'PROCEED') {
        this.updateStatusCustom(obj.customQuestionnaire, obj.activeQuestionnaire, "Submitted");
        this.saveDataCustom(obj.activeQuestionnaire)
        this.readOnly = true;
        this.formStatus = 'Submitted';
      }
    });
  }

  public updateStatuss(status: String): void {
    let flag: boolean = false;
    this.data.questionnaire.filter(obj => {
      if (obj.name.toString() == this.formName) {
        obj.status = status;
        flag = true;
      }
    });
  }

  protected undoSubmit(): void {
    this.readOnly = false;
    this.formStatus = 'Open';
    this.data.questionnaire.filter(obj => {
      (obj.name.toString() == this.formName) ? obj.status = this.formStatus : "";
    });
  }

  protected undoSubmitCustom(customQues: DQuestion): void {
    this.readOnly = false;
    customQues.status = 'Open';
    this.formStatus = 'Open';
  }

  // title of questionnaire for static questionnaire
  public static getTitle(quesName: String): String {
    let title: String;
    QUESTIONNAIRES.filter(obj => {
      (obj.name == quesName) ? title = obj.title : "";
    });
    return title;
  }

  // instruction of questionnaire for static questionnaire
  public static getInstruction(quesName: String): String {
    let instruction: String;
    QUESTIONNAIRES.filter(obj => {
      (obj.name == quesName) ? instruction = obj.instruction : "";
    });
    return instruction;
  }


  public formatDate(date: any) {
    return this.utilService.formateDate(new Date(Number.parseInt(date)));
  }

  protected changeModel($value: any) {
    // if year is greater then 1000
    if ($value.split("-")[0] > 1000) {
      return Date.parse($value);
    }
  }


  public updateStatus(questionnaires: Array<Questionnaire | DQuestion>, questionnaireType: String, status: String): void {
    questionnaires.filter(obj => {
      (obj.name == questionnaireType) ? obj.status = status : "";
    });
  }

  public updateStatusCustom(questionnaires: Array<DQuestion>, activequestionnaire: DQuestion, status: String) {
    questionnaires.filter(obj => {
      (obj.id == activequestionnaire.id) ? obj.status = status : "";
    });
  }




  public static getPath(ques: Questionnaire, rootPath: any): [any] {
    let path: any;
    if (ques.name == 'ADDRESS') {
      path = ['/' + rootPath + '/address'];
    } else if (ques.name == 'BIOMETRIC') {
      path = ['/' + rootPath + '/biometric'];
    } else if (ques.name == 'CRIMINAL') {
      path = ['/' + rootPath + '/criminal'];
    } else if (ques.name == 'PARENTS') {
      path = ['/' + rootPath + '/parents'];
    } else if (ques.name == 'INCOME') {
      path = ['/' + rootPath + '/employeer'];
    } else if (ques.name == 'CHILDREN') {
      path = ['/' + rootPath + '/children'];
    } else if (ques.name == 'EDUCATION') {
      path = ['/' + rootPath + '/education'];
    } else if (ques.name == 'TRAVEL') {
      path = [];
    } else if (ques.name == 'LASTADDRESSABROAD') {
      path = [];
    } else if (ques.name == 'MARRIAGE') {
      path = [];
    } else if (ques.name == 'HISTORY') {
      path = ['/' + rootPath + '/history'];
    } else if (ques.name == 'CRIMINALCONVICTION') {
      path = ['/' + rootPath + '/criminalconviction'];
    } else if (ques.name == 'ARRIVAL') {
      path = ['/' + rootPath + '/arrival'];
    } else if (ques.name == 'I94Entries') {
      path = ['/' + rootPath + '/i94Entry'];
    } else if (ques.name == 'OTHER') {
      path = ['/' + rootPath + '/other'];
    } else {
      path = ['/' + rootPath + '/customQuestionnaire', { q: ques['id'] }];
    }
    return path;

  }


}