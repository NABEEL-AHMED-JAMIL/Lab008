import { Component,Input } from '@angular/core';
import { HeaderService} from '../../services/header.service';
//----------------Service------------------------------
//-------------Routing---------------------------------
//-------------Model----------------------------------
//-------------Module----------------------------------
//------------Component--------------------------------

@Component({
    selector: 'file-header',
    templateUrl: './file-header.component.html',
    styleUrls: ['../../layout/layout.component.css']
})
export class FileHeaderComponent extends HeaderService {

    @Input()
    private title: String;
    @Input()
    private subtitle: String;
   
    
}
