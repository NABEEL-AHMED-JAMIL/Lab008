import { NgModule } from '@angular/core';

import { EChartsDirective } from './echarts.directive';
import { SlimScrollDirective } from './slim-scroll.directive';

import { QuestionnaireAddressComponent } from '../questionnaires/address/address.component';
import { BioMetricComponent } from '../questionnaires/biometric/biometric.component';
import { CriminalComponent } from '../questionnaires/criminal/criminal.component';
import { QuestionnairesHeaderComponent } from '../questionnaires/questionnaires.sub-header/questionnaires-header.component';
import { GuardianComponent } from '../questionnaires//guardian/guardian.component';
import { EmployeerComponent } from '../questionnaires//employeer/employeer.component';
import { ChildrenComponent } from '../questionnaires//children/children.component';
import { EducationComponent } from '../questionnaires//education/education.component';
import { HistoryComponent } from '../questionnaires//history/history.component';
import { OtherComponent } from '../questionnaires//other/other.component';
import { i94EntriesComponent } from '../questionnaires//I-94Entries/i94Entries.component';
import { ArrivalsComponent } from '../questionnaires//arrivals/arrivals.component';
import { CriminalConvictionsComponent } from '../questionnaires/criminalConvictions/criminalConvictions.component';


@NgModule({
    imports: [],
    declarations: [
        EChartsDirective,
        SlimScrollDirective,

        // QuestionnaireAddressComponent,
        // QuestionnairesHeaderComponent,
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


    ],
    exports: [
        EChartsDirective,
        SlimScrollDirective,

        // QuestionnaireAddressComponent,
        // QuestionnairesHeaderComponent,
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

    ],

})

export class SharedModule { }
