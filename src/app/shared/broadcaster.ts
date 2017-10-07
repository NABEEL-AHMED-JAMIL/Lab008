import { Input, Output, EventEmitter } from '@angular/core'

export class Broadcaster {


    @Output()
    changeValue: EventEmitter<any>;
    @Input()
    data: any;

    constructor(){

    }

    

}