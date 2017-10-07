import { NgModule } from '@angular/core';
//----------------Service------------------------------
//-------------Routing---------------------------------
import { FilesRoutingModule } from './files-routing.module';
//-------------Model----------------------------------
//-------------Module----------------------------------
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
//------------Component--------------------------------
import { FilesComponent } from './files.component';
import { FileHeaderComponent } from './file.sub-header/file-header.component';


@NgModule({
    imports: [
        FilesRoutingModule,
        MaterialModule,
        CommonModule
        
    ],
    declarations: [
        FilesComponent,
        FileHeaderComponent
    ]
})

export class FileModule {}
