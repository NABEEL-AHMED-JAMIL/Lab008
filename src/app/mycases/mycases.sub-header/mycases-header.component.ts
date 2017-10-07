import { Component, Input } from '@angular/core';
import { Matter } from '../../model/dmatter';
import { DMatterEndpointService } from '../../services/dmatter.endpoint.service';
import { UtilService } from '../../services/util.service';
import { HeaderService } from '../../services/header.service';
@Component({
    selector: 'mycases-header',
    templateUrl: './mycases-header.component.html',
    styleUrls: ['../../layout/layout.component.css']
})
export class MyCasesHeaderComponent extends HeaderService {

    @Input()
    private title: String;
    @Input()
    private subtitle: String;
    @Input()
    private item: Matter;
    @Input()
    private balance: any;

    constructor(private myCaseService: DMatterEndpointService, private utilService: UtilService) {
            super();
     }



}
