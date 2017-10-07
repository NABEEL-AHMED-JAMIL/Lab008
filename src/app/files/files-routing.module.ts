//----------------Service------------------------------
//-------------Routing---------------------------------
import { Routes, RouterModule } from '@angular/router';
//-------------Model----------------------------------
//-------------Module----------------------------------
//------------Component--------------------------------
import { FilesComponent } from '../files/files.component';

export const FilesRoutes: Routes = [
    {
        path: '',
        component: FilesComponent,
        children: [
            { path: '', redirectTo: '/app/files', pathMatch: 'full' },
        ]
    }
];

export const FilesRoutingModule = RouterModule.forChild(FilesRoutes);
