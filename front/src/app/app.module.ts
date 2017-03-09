import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { ROUTES } from './app.routes'; // ROUTING HERE!
import { APP_BASE_HREF } from '@angular/common';

import { MaterialModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { HomeComponent } from './Home/HomeComponent';
import { MenuBarComponent } from './MenuBar/MenuBarComponent';
import { SignupComponent } from './Signup/signup.component';
import { SigninComponent } from './Signin/signin.component';
import { ProfileCompletationComponent } from './profile-completation/profile-completation.component';
import { ProgramComponent } from './program/program.component';


@NgModule({
    declarations: [
        AppComponent,
        SigninComponent,
        SignupComponent,
        ProfileCompletationComponent,
        HomeComponent,
        MenuBarComponent,
        ProgramComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        RouterModule.forRoot(ROUTES),
        ChartsModule
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
