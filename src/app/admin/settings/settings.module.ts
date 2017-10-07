import { NgModule } from '@angular/core';

import { SettingsComponent } from './settings.component';
import { SettingsHeaderComponent } from './settings.sub-header/settings-header.component';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        SettingsComponent,
        SettingsHeaderComponent,
    ]
})

export class SettingsModule {}
