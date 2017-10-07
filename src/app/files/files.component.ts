import { Component, OnInit } from '@angular/core';
//----------------Service------------------------------
import { UtilService } from '../services/util.service';
import { DUserEndpointService } from '../services/duser.endpoint.service';
//-------------Routing--------------------------------
import { ActivatedRoute, Router } from '@angular/router';
//-------------Model----------------------------------
import { KeyValuePair } from '../model/keyValuePair';
//-------------Module----------------------------------
//------------Component--------------------------------


@Component({
    selector: 'my-files',
    templateUrl: './files.component.html',
    styleUrls: ['../layout/layout.component.css']
})
export class FilesComponent {

    title: String;
    subtitle: String;
    folderId: string;

    constructor(private dUserEndpointService: DUserEndpointService,
        private route: ActivatedRoute,
        private router: Router,
        private utilService: UtilService) {
        this.title = "Files";
        this.subtitle = "Click below to access your secure file areas";
        this.folderId = this.utilService.getFolderId();
        console.log("Files " + this.folderId);

    }


}
