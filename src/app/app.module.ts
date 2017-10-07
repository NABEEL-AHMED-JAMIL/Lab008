import { NgModule, ApplicationRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Layout
import { LayoutComponent } from './layout/layout.component';
import { PreloaderDirective } from './layout/preloader.directive';
// Header
import { AppHeaderComponent } from './layout/header/header.component';
// Sidenav
import { AppSidenavComponent } from './layout/sidenav/sidenav.component';
import { ToggleOffcanvasNavDirective } from './layout/sidenav/toggle-offcanvas-nav.directive';
import { AutoCloseMobileNavDirective } from './layout/sidenav/auto-close-mobile-nav.directive';
import { AppSidenavMenuComponent } from './layout/sidenav/sidenav-menu/sidenav-menu.component';
import { AccordionNavDirective } from './layout/sidenav/sidenav-menu/accordion-nav.directive';
import { AppendSubmenuIconDirective } from './layout/sidenav/sidenav-menu/append-submenu-icon.directive';
import { HighlightActiveItemsDirective } from './layout/sidenav/sidenav-menu/highlight-active-items.directive';
// Footer
import { AppFooterComponent } from './layout/footer/footer.component';
// Sub modules
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
// hmr
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
//import services
import { DUserEndpointService } from './services/duser.endpoint.service';
import { DMatterEndpointService } from './services/dmatter.endpoint.service';
import { DTaskEndpointService } from './services/dtask.endpoint.service';
import { DQuestionnaireEndpoinService } from './services/dquestionnaireendpoin.service';
import { AuthGuard } from './services/auth-guard.service';
import { UtilService } from './services/util.service';
import { AlertService } from './services/alert.service';
import { DContactcacheEndpointService } from './services/dcontactcache.endpoint.service';
import { DAccountEndpointService} from './services/daccountendpoint.service';
//import {GoogleAPIService} from './services/google.service';
//import {DTaskEndPointApiService} from './services/dtask.endpoint.service';

// user check-list
import { CheckListComponent } from './checklist/checklists.component';
import { CheckListHeaderComponent } from './checklist/check-list-header/check-list-header.component';


// import new Component
import { MyCasesComponent } from './mycases/mycases.component';
import { MyCasesHeaderComponent } from './mycases/mycases.sub-header/mycases-header.component';
import { SelectedCaseComponent } from './mycases/selected.case/selected-case.component';
import { SettingsComponent } from './admin/settings/settings.component';

// end 
// login component
import { PageLoginComponent } from './login-page/login/login.component';
import { PageSignUpComponent } from './login-page/sign-up/sign-up.component';
import { PageForgotPasswordComponent } from './login-page/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login-page/reset-password/reset-password.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './loading/loading.service';
import { HeaderComponent } from './login-page/form-background/header/header.component'; 
import  { FooterComponent } from  './login-page/form-background/footer/footer.component';
// alert component
import { AlertComponent } from './alert/alert.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChecklistComponent } from './admin/checklists/checklists.component';
import { EditChecklistComponent } from './admin/checklists/edit/edit-checklist.component'
import { CreateChecklistComponent } from './admin/checklists/create/create-checklist.component'
import { ContactsComponent } from './admin/contacts/contacts.component';
import { ContactsHeaderComponent } from './admin/contacts/contacts.sub-header/contacts-header.component';
import { SelectedUser } from './admin/contacts/selected.user/selected-user.component';

import { PresetsComponent } from './admin/presets/presets.component';
import { CreatePresetsComponent } from './admin/presets/create-presets/create-presets.component';
import { CreatePresetsHeaderComponent } from './admin/presets/create-presets-header/create-presets-header.component';
import { QuestionnairesAdminComponent } from './admin/questionnaires/questionnaires.admin.component';
import { SettingsHeaderComponent } from './admin/settings/settings.sub-header/settings-header.component';
import { DuserRequestComponent } from './admin/request/duser.request.component';
import { DuserRequestHeaderComponent } from './admin/request/request-subheader/duser.request.header.component'
// dialog
import { ConfirmDialog } from './confirm-dialog/confirmDialog.component';
import { InfoDialog } from './confirm-dialog/info-dialog/info-dialog.component';
import { RichText } from './rich-text/rich-text.component';
import { SignoutDialuog } from './confirm-dialog/signOutDialog.component';
import { MessageConfirmDialog } from './confirm-dialog/messageDialog.component';
import { AssignCheckListDialog } from './confirm-dialog/assign-checklist-dialog/assign-checklist-dialog.component';
import { AssignQuestionDialog } from './confirm-dialog/assign-question-dialog/assign-question-dialog.component';
import { AssignPresetDialog } from './confirm-dialog/assign-preset-dialog/assign-preset-dialog.component';
import { ApprovedDuserRequestDialog } from './confirm-dialog/approvedDuserRequest.component';
import { QuestionnaireSelectComponent } from './confirm-dialog/questionnaire-selecte.compoent';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
//import { QuillEditorModule} from 'ng2-quill-editor';
// questionnaire component
import { QuestionnaireAddressComponent } from './questionnaires/address/address.component';
import { BioMetricComponent } from './questionnaires/biometric/biometric.component';
import { CriminalComponent } from './questionnaires/criminal/criminal.component';
import { QuestionnairesHeaderComponent } from './questionnaires/questionnaires.sub-header/questionnaires-header.component';
import { GuardianComponent } from './questionnaires/guardian/guardian.component';
import { EmployeerComponent } from './questionnaires/employeer/employeer.component';
import { ChildrenComponent } from './questionnaires/children/children.component';
import { EducationComponent } from './questionnaires/education/education.component';
import { HistoryComponent } from './questionnaires/history/history.component';
import { OtherComponent } from './questionnaires/other/other.component';
import { i94EntriesComponent } from './questionnaires/I-94Entries/i94Entries.component';
import { ArrivalsComponent } from './questionnaires/arrivals/arrivals.component';
import { CriminalConvictionsComponent } from './questionnaires/criminalConvictions/criminalConvictions.component';
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { CustomeQuestionnaireComponent } from './questionnaires/custom/custom.component';

import { CreaeteQuestionnairesComponent } from './admin/questionnaires/create-questionnaire/create-questionnaire.component'
import { QuestionnaireHeaderAdminComponent } from './admin/questionnaires/questionnaires-sub-header/questionnaires-header.component';
// pipe
import { QuestionnaireFilterPipe } from './admin/questionnaires/create-questionnaire/create-questionnaire-filter.pipe';
import { DndModule } from 'ng2-dnd';
import { MdSnackBar, MdDialog } from '@angular/material';
// object storage
 import { ObjectStorage} from './model/objectStorage';
import { ReCaptchaModule } from 'angular2-recaptcha';

// pipe
 import { DateFormat} from './shared/datePipe';

@NgModule({
    imports: [
        ReCaptchaModule,
        DndModule.forRoot(),
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        // Sub modules
        LayoutModule,
        SharedModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        //QuillEditorModule
    ],
    declarations: [
        // pipe
        DateFormat,
        QuestionnaireFilterPipe,

        QuestionnaireHeaderAdminComponent,
        CreaeteQuestionnairesComponent,
        QuestionnairesComponent,
        QuestionnairesHeaderComponent,
        QuestionnaireAddressComponent,
        BioMetricComponent,
        GuardianComponent,
        EmployeerComponent,
        CriminalComponent,
        ChildrenComponent,
        EducationComponent,
        HistoryComponent,
        CriminalConvictionsComponent,
        OtherComponent,
        i94EntriesComponent,
        ArrivalsComponent,
        CustomeQuestionnaireComponent,

        // admin check list
        ChecklistComponent,
        EditChecklistComponent,
        CreateChecklistComponent,
        ContactsComponent,
        ContactsHeaderComponent,
        SelectedUser,
        PresetsComponent,
        CreatePresetsComponent,
        CreatePresetsHeaderComponent,
        QuestionnairesAdminComponent,
        SettingsHeaderComponent,
        AppComponent,
        DuserRequestComponent,
        DuserRequestHeaderComponent,
        // Layout
        LayoutComponent,
        PreloaderDirective,
        // Header
        AppHeaderComponent,
        // Sidenav
        AppSidenavComponent,
        ToggleOffcanvasNavDirective,
        AutoCloseMobileNavDirective,
        AppSidenavMenuComponent,
        AccordionNavDirective,
        AppendSubmenuIconDirective,
        HighlightActiveItemsDirective,
        // Footer
        AppFooterComponent,
        // adding the new component
        MyCasesComponent,
        SettingsComponent,
        MyCasesHeaderComponent,
        SelectedCaseComponent,
        // user check-list
        CheckListComponent,
        CheckListHeaderComponent,
        // adding the login component
        HeaderComponent,
        FooterComponent,
        PageLoginComponent,
        PageSignUpComponent,
        PageForgotPasswordComponent,
        ResetPasswordComponent,
        LoadingComponent,
        // alert
        AlertComponent,
        ConfirmDialog,
        SignoutDialuog,
        MessageConfirmDialog,
        InfoDialog,
        AssignCheckListDialog,
        AssignQuestionDialog,
        AssignPresetDialog,
        ApprovedDuserRequestDialog,
        QuestionnaireSelectComponent,
        RichText
    ],
    providers: [
        // GoogleAPIService,
        UtilService,
        DMatterEndpointService,
        DUserEndpointService,
        DTaskEndpointService,
        DAccountEndpointService,
        DQuestionnaireEndpoinService,
        AuthGuard,
        LoadingService,
        AlertService,
        DContactcacheEndpointService,
        SharedModule,
        AppSidenavMenuComponent,
        ObjectStorage
    ],
    entryComponents: [
        ConfirmDialog,
        InfoDialog,
        SignoutDialuog,
        MessageConfirmDialog,
        AssignCheckListDialog,
        AssignQuestionDialog,
        AssignPresetDialog,
        ApprovedDuserRequestDialog,
        QuestionnaireSelectComponent,
        RichText,

    ],
    exports: [
        ConfirmDialog,
        InfoDialog,
        SignoutDialuog,
        MessageConfirmDialog,
        AssignCheckListDialog,
        AssignQuestionDialog,
        ApprovedDuserRequestDialog,
        DndModule
        //        QuestionnaireAddressComponent,

    ],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(public appRef: ApplicationRef) {

    }
    hmrOnInit(store) { }

    hmrOnDestroy(store) {
        const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }
    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
// https://test-dot-dev-lolly.appspot.com