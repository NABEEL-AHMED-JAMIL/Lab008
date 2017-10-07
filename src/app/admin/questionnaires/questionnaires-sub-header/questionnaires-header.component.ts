import { Component, Input } from '@angular/core';
import { ContactCache } from '../../../model/dContactCache';
import { Duser } from '../../../model/duser.model';
import { DContactcacheEndpointService } from '../../../services/dcontactcache.endpoint.service';
import { HeaderService } from '../../../services/header.service';


@Component({
    selector: 'questionnaire-admin-header',
    templateUrl: './questionnaires-header.component.html',
    styleUrls: ['../../../layout/layout.component.css']
})


export class QuestionnaireHeaderAdminComponent extends HeaderService {

    @Input()
    private title: String;
    @Input()
    private subtitle: String;

    public constructor() {
        super();
    }


}
