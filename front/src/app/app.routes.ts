// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
// import { ModuleWithProviders }  from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './Home/HomeComponent';
import { SigninComponent } from './Signin/signin.component';
import { ProgramComponent } from './program/program.component';
import { SignupComponent} from './Signup/signup.component';
import { ProfileCompletationComponent } from './profile-completation/profile-completation.component';
import { SessionsComponent } from "./sessions/sessions.component";
import {ProgramResolver} from "./program/program.resolver";

// Route Configuration
export const ROUTES: Routes = [
    { path: 'accueil', component: HomeComponent },
    { path: 'inscription', component: SignupComponent },
    { path: 'connexion', component: SigninComponent },
    { path: 'programme', component: ProgramComponent, resolve:{
        program: ProgramResolver
    }},
    { path: 'seances', component: SessionsComponent },
    { path: 'profil/complete', component: ProfileCompletationComponent },
    { path: '', redirectTo: '/accueil', pathMatch: 'full' }
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];
