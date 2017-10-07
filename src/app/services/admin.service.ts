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
import { Questionnaire } from '../model/dQuestionnaire';
import { UtilService } from '../services/util.service';
import { SessionFilter } from '../shared/session.filter';
import { LoadingService } from '../loading/loading.service';

@Injectable()
export class AdminService {
  protected message: Message;
  protected readOnly: boolean
  protected formStatus: String;
  protected sessionUser: Duser;
  
  constructor() {
    //super(router, loadingService);
    this.message = new Message();
    this.sessionUser = JSON.parse(sessionStorage.getItem("signin_user"));

  }




}