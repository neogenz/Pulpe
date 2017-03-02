// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
// import { ModuleWithProviders }  from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './Home/HomeComponent';
import { SigninComponent } from './Signin/SigninComponent';

// Route Configuration
export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'signin', component: SigninComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];
