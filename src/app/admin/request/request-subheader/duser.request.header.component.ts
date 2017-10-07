import { Component, Input } from '@angular/core';
import { HeaderService } from '../../../services/header.service';


@Component({
    selector: 'duser-request-header',
    templateUrl: './duser.request.header.component.html',
    styleUrls: ['../../../layout/layout.component.css']
})
export class DuserRequestHeaderComponent extends HeaderService {

    @Input()
    private title: String;
    @Input()
    private subtitle: String;


    constructor() {
        super();
    }


}

