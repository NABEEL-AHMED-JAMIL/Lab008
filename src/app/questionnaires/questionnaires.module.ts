import { NgModule } from '@angular/core';

import { QuestionnairesRoutesModule } from './questionnaires-routing.module';
import { QuestionnairesComponent } from './questionnaires.component';
import { QuestionnairesHeaderComponent } from './questionnaires.sub-header/questionnaires-header.component';
import { QuestionnaireAddressComponent } from './address/address.component';
import { BioMetricComponent} from './biometric/biometric.component';
import { GuardianComponent} from './guardian/guardian.component';
import { EmployeerComponent} from './employeer/employeer.component';
import { CriminalComponent} from './criminal/criminal.component';
import { ChildrenComponent } from './children/children.component';
import { EducationComponent } from './education/education.component';
import { HistoryComponent } from './history/history.component';
import { OtherComponent } from './other/other.component';
import { i94EntriesComponent } from './I-94Entries/i94Entries.component';
import { ArrivalsComponent } from './arrivals/arrivals.component';


import { CriminalConvictionsComponent } from './criminalConvictions/criminalConvictions.component';
import { MaterialModule,DateAdapter,MdDatepicker,MdNativeDateModule,MdSnackBar, MdDialog} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumber } from '../shared/only-number.directive';
import { CommonModule} from '@angular/common';



@NgModule({
    imports: [
        QuestionnairesRoutesModule,
        MaterialModule,
        MdNativeDateModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    declarations: [
       
        // QuestionnairesComponent,
        // QuestionnairesHeaderComponent,
        // QuestionnaireAddressComponent,
        // BioMetricComponent,
        // GuardianComponent,
        // EmployeerComponent,
        // CriminalComponent,
        // ChildrenComponent,
        // EducationComponent,
        // HistoryComponent,
        // CriminalConvictionsComponent,
        // OtherComponent,
        // i94EntriesComponent,
        // ArrivalsComponent,
        OnlyNumber,
    ],
    entryComponents:[
    ]
})

export class QuestionnairesModule {}
