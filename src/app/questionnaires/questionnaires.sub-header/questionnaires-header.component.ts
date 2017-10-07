import { Component, Input } from '@angular/core';
import { Duser } from '../../model/duser.model';
import { ObjectStorage } from '../../model/objectStorage';
import { HeaderService} from '../../services/header.service';

@Component({
    selector: 'questionnaires-header',
    templateUrl: './questionnaires-header.component.html',
    styleUrls: ['../../layout/layout.component.css']
})
export class QuestionnairesHeaderComponent extends HeaderService {

    @Input()
    private title: String;
    @Input()
    private subtitle: String;

    @Input()
    private path: String;
    @Input()
    private showArrow: boolean;

    private sessionUser: Duser;
    private adminLink: boolean = false;
    public constructor() {
        super();
        if (sessionStorage.getItem("signin_user") != null) {
            this.sessionUser = JSON.parse(sessionStorage.getItem("signin_user"));
            if (this.sessionUser["admin"] || this.sessionUser["canManageClientBridge"]) {
                this.adminLink = true;

            }
        }
    }
    
}
