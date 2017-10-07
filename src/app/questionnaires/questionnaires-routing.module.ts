import { Routes, RouterModule } from '@angular/router';
import { QuestionnairesComponent } from '../questionnaires/questionnaires.component';
import { QuestionnaireAddressComponent } from './address/address.component';
import { BioMetricComponent } from './biometric/biometric.component';
import { GuardianComponent } from './guardian/guardian.component';
import { EmployeerComponent } from './employeer/employeer.component';
import { CriminalComponent } from './criminal/criminal.component';
import { ChildrenComponent } from './children/children.component';
import { EducationComponent } from './education/education.component';
import { HistoryComponent } from './history/history.component';
import { OtherComponent } from './other/other.component';
import { i94EntriesComponent } from './I-94Entries/i94Entries.component';
import { ArrivalsComponent } from './arrivals/arrivals.component';
import { CriminalConvictionsComponent } from './criminalConvictions/criminalConvictions.component';

export const QuestionnairesRoutes: Routes = [

    // { path: 'app/questionnaires', redirectTo: 'app/questionnaires', pathMatch: 'full' },
    
    { path: '', redirectTo: 'app/questionnaires', pathMatch: 'full' },    
    { path: '', component: QuestionnairesComponent },
    { path: 'questionnaire-address', component: QuestionnaireAddressComponent },
    { path: 'questionnaire-biometric', component: BioMetricComponent },
    { path: 'questionnaire-guardian', component: GuardianComponent },
    { path: 'questionnaire-employeer', component: EmployeerComponent },
    { path: 'questionnaire-criminal', component: CriminalComponent },
    { path: 'questionnaire-children', component: ChildrenComponent },
    { path: 'questionnaire-education', component: EducationComponent },
    { path: 'questionnaire-history', component: HistoryComponent},
    { path: 'questionnaire-criminal-convictions', component: CriminalConvictionsComponent },
    { path: 'questionnaire-other', component: OtherComponent },
    { path: 'questionnaire-i94Entries', component: i94EntriesComponent },
    { path: 'questionnaire-arrivals', component: ArrivalsComponent }
];

export const QuestionnairesRoutesModule = RouterModule.forChild(QuestionnairesRoutes);
