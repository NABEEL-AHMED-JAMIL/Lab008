import { Matter } from '../model/dmatter';

import { Injectable, Inject } from '@angular/core';
import { DUserEndpointService } from '../services/duser.endpoint.service';
import { FMatter } from '../model/fmatter';
import { Duser } from '../model/duser.model';
import { Questionnaire } from '../model/dQuestionnaire';
import { DQuestion } from '../model/dQuestion';
import { LollyService } from '../services/lolly.service';
import { GoogleAPIService } from '../services/google.service';
import { AlertService } from '../services/alert.service';
import { Observable } from 'rxjs/Rx';
import { LoadingService } from '../loading/loading.service'
import { FormGroup } from '@angular/forms';
import { ContactCache } from './../model/dContactCache'
import { QuestionnaireType } from './../model/dQuestionnaireType'
import { ObjectStorage } from './../model/objectStorage'
import { MdSnackBar, MdDialog } from '@angular/material';
import { Router } from '@angular/router'


/* singleton service*/
@Injectable()
export class DContactcacheEndpointService extends LollyService {


  private contactCache: ContactCache;
  private adminContactCache: ContactCache;

  public constructor(protected router: Router, protected dialog: MdDialog) {
    super(router, dialog);
  }




  public geteContact(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // if state of  data exist in singleton object
      if (this.objectStorage.getContactCache()) {
        resolve(this.objectStorage.getContactCache());
      } else {
        let contactId;
        // if admin is searching user
        contactId = (this.objectStorage.getSearchUserId_session()) ?
          this.objectStorage.getSearchUserId_session() :
          this.objectStorage.getUser_session().dContact;
        resolve(this.getDContactCache(contactId));
      }
    })
  }




  // by ID
  public getDContactCache(id: String): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.authenticate().then((gapi) => {
        gapi.client.dcontactcacheendpoint.getDContactCache({ "id": id }).execute((response) => {
          this.processResponses(response, resolve, reject);
        })
      })
    }).catch(err => {
      this.populateDialog(err);
    })
  }


  public saveContactCache(data: ContactCache) {
    return new Promise<any>((resolve, reject) => {
      this.authenticate().then((gapi) => {
        gapi.client.dcontactcacheendpoint.updateDContactCache(data).execute((response) => {
          this.processResponses(response, resolve, reject);
        })
      })
    }).catch(err => {
      this.populateDialog(err);
    })
  }

  
  public getFolder() {
    let contact = {
      "contact": this.objectStorage.getSearchUserId_session().dContact
    };
    return new Promise<any>((resolve, reject) => {
      this.authenticate().then((gapi) => {
        gapi.client.dcontactcacheendpoint.getFolderId(contact).execute((response) => {
          this.processResponses(response, resolve, reject);
        })
      })
    }).catch(err => {
      this.populateDialog(err);
    })
  }


  public getFiltered(search: any) {
    return new Promise<any>((resolve, reject) => {
      this.authenticate().then((gapi) => {
        gapi.client.dcontactcacheendpoint.getFiltered({ "search": search }).execute((response) => {
          this.processResponses(response, resolve, reject);
        })
      })
    }).catch(err => {
      this.populateDialog(err);
    })
  }

  public linkToLolly(id: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.authenticate().then((gapi) => {
        gapi.client.dcontactcacheendpoint.linkToLolly({ 'id': id }).execute((response) => {
          this.processResponses(response, resolve, reject);
        })
      })
    }).catch(err => {
      this.populateDialog(err);
    })
  }

  public getOpenStatus(id: String): Observable<any> {
    return new Observable(observer => {
      this.authenticate().then((gapi) => {
        gapi.client.dcontactcacheendpoint.getDContactCache({ "id": id }).execute((response) => {
          observer.next(this.calculateOpenStatus(response));
        })
      })

    });

  }

  public calculateOpenStatus(obj: ContactCache): number {
    let openStatus = 0;
    if (obj.questionnaire) {
      obj.questionnaire.filter(ques => {
        if (ques.status.toLocaleLowerCase() == 'open') {
          ++openStatus;
        }
      })
    }
    if (obj.customQuestionnaire) {
      obj.customQuestionnaire.filter(ques => {
        (ques.status.toLocaleLowerCase() == 'open') ? ++openStatus : "";
      })
    }
    return openStatus;
  }

}