// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
// import { ModuleWithProviders }  from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './Home/HomeComponent';
import { SigninComponent } from './Signin/SigninComponent';
import { ProgramComponent } from './program/program.component';
import { SignupComponent} from './Signup/signup.component';

// Route Configuration
export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'programme', component: ProgramComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];
