import {Routes} from '@angular/router';
import {HomeComponent} from './Home/HomeComponent';
import {SigninComponent} from './signin/signin.component';
import {EvolutionComponent} from './evolution/evolution.component';
import {ProgramComponent} from './program/program.component';
import {SignupComponent} from './Signup/signup.component';
import {ProfileCompletationComponent} from './profile-completation/profile-completation.component';
import {SessionsComponent} from "./sessions/sessions.component";
import {ProgramResolver} from "./program/program.resolver";
import {AuthenticationGuard} from "./_guards/authentication-guard.service";
import {WelcomeComponent} from "./welcome/welcome.component";
import {ProfileComponent} from "./profile/profile.component";
import {SessionsResolver} from "./sessions/sessions.resolver";

// Route Configuration
export const ROUTES: Routes = [
    {
        path: '',
        component: WelcomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'accueil',
        component: HomeComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'inscription',
        component: SignupComponent
    },
    {
        path: 'connexion',
        component: SigninComponent
    },
    {
        path: 'programme',
        component: ProgramComponent,
        resolve: {
            program: ProgramResolver,
        },
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'evolution',
        component: EvolutionComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'seances',
        component: SessionsComponent,
        canActivate: [AuthenticationGuard],
        resolve: {
            sessions: SessionsResolver
        }
    },
    {
        path: 'profil',
        component: ProfileComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'profil/complete',
        component: ProfileCompletationComponent,
        canActivate: [AuthenticationGuard]
    }
    //{path: '', redirectTo: '/', pathMatch: 'full'}
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];
