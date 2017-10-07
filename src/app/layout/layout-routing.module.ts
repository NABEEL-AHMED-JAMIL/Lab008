import { RouterModule, Routes } from '@angular/router';
// structure component
import { LayoutComponent } from './layout.component';
// project component
import { MyCasesComponent } from '../mycases/mycases.component';
// user check-list
import { CheckListComponent } from '../checklist/checklists.component';


import { SettingsComponent } from '../admin/settings/settings.component';
import { ContactsComponent } from '../admin/contacts/contacts.component';
import { SelectedUser } from '../admin/contacts/selected.user/selected-user.component';
import { ChecklistComponent } from '../admin/checklists/checklists.component';
import { EditChecklistComponent } from '../admin/checklists/edit/edit-checklist.component';
import { CreateChecklistComponent } from '../admin/checklists/create/create-checklist.component';
import { PresetsComponent } from '../admin/presets/presets.component';
import { CreatePresetsComponent } from '../admin/presets/create-presets/create-presets.component';
import { QuestionnairesAdminComponent } from '../admin/questionnaires/questionnaires.admin.component';

// questionnair
import { QuestionnairesComponent } from '../questionnaires/questionnaires.component';
import { QuestionnaireAddressComponent } from '../questionnaires/address/address.component';
import { BioMetricComponent } from '../questionnaires/biometric/biometric.component';
import { CriminalComponent } from '../questionnaires/criminal/criminal.component';
import { GuardianComponent } from '../questionnaires//guardian/guardian.component';
import { EmployeerComponent } from '../questionnaires//employeer/employeer.component';
import { ChildrenComponent } from '../questionnaires//children/children.component';
import { EducationComponent } from '../questionnaires//education/education.component';
import { HistoryComponent } from '../questionnaires//history/history.component';
import { OtherComponent } from '../questionnaires//other/other.component';
import { i94EntriesComponent } from '../questionnaires//I-94Entries/i94Entries.component';
import { ArrivalsComponent } from '../questionnaires//arrivals/arrivals.component';
import { CriminalConvictionsComponent } from '../questionnaires/criminalConvictions/criminalConvictions.component';
import { CustomeQuestionnaireComponent } from '../questionnaires/custom/custom.component';

import { DuserRequestComponent } from '../admin/request/duser.request.component';
import { DuserRequestHeaderComponent } from '../admin/request/request-subheader/duser.request.header.component'
import { CreaeteQuestionnairesComponent } from '../admin/questionnaires/create-questionnaire/create-questionnaire.component';
import { SelectedCaseComponent } from '../mycases/selected.case/selected-case.component';
import { AuthGuard } from '../services/auth-guard.service';



const routes: Routes = [
    {
        path: 'app',
        component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: '/app/mycases', pathMatch: 'full' }, // default path
            { path: 'mycases', component: MyCasesComponent, canActivate: [AuthGuard] },
            { path: 'mycases/selected-case/:id', component: SelectedCaseComponent, canActivate: [AuthGuard] },
            { path: 'checklist', component: CheckListComponent, canActivate: [AuthGuard] },
            { path: 'files', loadChildren: '../files/files.module#FileModule' },
            { path: 'questionnaires', component: QuestionnairesComponent, canActivate: [AuthGuard] },
            { path: 'address', component: QuestionnaireAddressComponent, canActivate: [AuthGuard] },
            { path: 'children', component: ChildrenComponent, canActivate: [AuthGuard] },
            { path: 'biometric', component: BioMetricComponent, canActivate: [AuthGuard] },
            { path: 'education', component: EducationComponent, canActivate: [AuthGuard] },
            { path: 'parents', component: GuardianComponent, canActivate: [AuthGuard] },
            { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
            { path: 'employeer', component: EmployeerComponent, canActivate: [AuthGuard] },
            { path: 'other', component: OtherComponent, canActivate: [AuthGuard] },
            { path: 'criminal', component: CriminalComponent, canActivate: [AuthGuard] },
            { path: 'i94Entry', component: i94EntriesComponent, canActivate: [AuthGuard] },
            { path: 'arrival', component: ArrivalsComponent, canActivate: [AuthGuard] },
            { path: 'criminalconviction', component: CriminalConvictionsComponent, canActivate: [AuthGuard] },
            { path: 'customQuestionnaire', component: CustomeQuestionnaireComponent, canActivate: [AuthGuard] },

        ]
    },
    {
        path: 'admin',
        component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: '/admin/settings', pathMatch: 'full' }, // default  path
            { path: 'checklists', component: ChecklistComponent, canActivate: [AuthGuard] },
            { path: 'editchecklist', component: EditChecklistComponent, canActivate: [AuthGuard] },
            { path: 'createchecklist', component: CreateChecklistComponent, canActivate: [AuthGuard] },
            { path: 'createchecklist', component: CreateChecklistComponent, canActivate: [AuthGuard] },
            { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
            { path: 'selecteduser', component: SelectedUser, canActivate: [AuthGuard] },
            { path: 'selecteduser/:tab', component: SelectedUser, canActivate: [AuthGuard] },
            { path: 'checklists', component: ChecklistComponent, canActivate: [AuthGuard] },
            { path: 'editchecklist', component: EditChecklistComponent, canActivate: [AuthGuard] },
            { path: 'createchecklist', component: CreateChecklistComponent, canActivate: [AuthGuard] },
            { path: 'createchecklist/:id', component: CreateChecklistComponent, canActivate: [AuthGuard] },
            { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
            { path: 'selecteduser', component: SelectedUser, canActivate: [AuthGuard] },
            { path: 'selecteduser/:tab', component: SelectedUser, canActivate: [AuthGuard] },
            { path: 'presets', component: PresetsComponent, canActivate: [AuthGuard] },
            { path: 'createpresets', component: CreatePresetsComponent },
            { path: 'questionnaires', component: QuestionnairesAdminComponent },
            { path: 'request', component: DuserRequestComponent },
            { path: 'request-header', component: DuserRequestHeaderComponent },
            { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
            { path: 'address', component: QuestionnaireAddressComponent },
            { path: 'children', component: ChildrenComponent, canActivate: [AuthGuard] },
            { path: 'biometric', component: BioMetricComponent, canActivate: [AuthGuard] },
            { path: 'education', component: EducationComponent, canActivate: [AuthGuard] },
            { path: 'parents', component: GuardianComponent, canActivate: [AuthGuard] },
            { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
            { path: 'employeer', component: EmployeerComponent, canActivate: [AuthGuard] },
            { path: 'other', component: OtherComponent, canActivate: [AuthGuard] },
            { path: 'criminal', component: CriminalComponent, canActivate: [AuthGuard] },
            { path: 'i94Entry', component: i94EntriesComponent, canActivate: [AuthGuard] },
            { path: 'arrival', component: ArrivalsComponent, canActivate: [AuthGuard] },
            { path: 'criminalconviction', component: CriminalConvictionsComponent, canActivate: [AuthGuard] },
            { path: 'createQuetionnaire', component: CreaeteQuestionnairesComponent, canActivate: [AuthGuard] },
            { path: 'createQuetionnaire/:id', component: CreaeteQuestionnairesComponent, canActivate: [AuthGuard] },
            { path: 'customQuestionnaire', component: CustomeQuestionnaireComponent, canActivate: [AuthGuard] },

        ]
    },


];

export const LayoutRoutingModule = RouterModule.forChild(routes);

