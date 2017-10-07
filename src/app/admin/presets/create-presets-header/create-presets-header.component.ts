import { Component, Input } from '@angular/core';
import { HeaderService } from '../../../services/header.service';

@Component({
    selector: 'create-presets-header',
    templateUrl: './create-presets-header.component.html',
    styleUrls: ['../../../layout/layout.component.css']
})
export class CreatePresetsHeaderComponent extends HeaderService {

    @Input()
    private title: String;
    @Input()
    private subtitle: String;

    constructor() {
        super();
     }


}
