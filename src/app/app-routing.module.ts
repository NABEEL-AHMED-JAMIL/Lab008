import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { MyCasesComponent } from './mycases/mycases.component';

// login component
import { PageLoginComponent } from './login-page/login/login.component';
import { PageSignUpComponent } from './login-page/sign-up/sign-up.component';
import { PageForgotPasswordComponent } from './login-page/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login-page/reset-password/reset-password.component';
// Guard
import { AuthGuard} from './services/auth-guard.service';
// end of the compoent


const AppRoutes: Routes = [


    { path: '', redirectTo: '/login', pathMatch: 'full' },
    // end 
    // login compoent 
    { path: 'login', component: PageLoginComponent },
    { path: 'login/:id', component: PageLoginComponent },
    { path: 'login/:id/:accountId', component: PageLoginComponent },
    // { path: 'login/:signup/:id', component: PageLoginComponent },
    // /:id
    //  { path: 'sign-up', component: PageSignUpComponent },
    { path: 'sign-up/:id', component: PageSignUpComponent },
    { path: 'sign-up/:id/:accountId', component: PageSignUpComponent },
    { path: 'forgot-password', component: PageForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    // end
    // , canActivate: [AuthGuard]
    { path: 'app', component: LayoutComponent , canActivate: [AuthGuard] },
    { path: 'admin', component: LayoutComponent , canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

export const AppRoutingModule = RouterModule.forRoot(AppRoutes, {useHash: true});
