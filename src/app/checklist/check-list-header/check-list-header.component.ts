import { Component, Input } from '@angular/core';
import { HeaderService} from '../../services/header.service';


@Component({

    selector: 'check-list-header',
    templateUrl: './check-list-header.component.html',
    styleUrls: ['../../layout/layout.component.css']

})

export class CheckListHeaderComponent extends HeaderService {

    @Input()
    private title: String;
    @Input()
    private subtitle: String;
    
    constructor(){
        super();
     }


}
