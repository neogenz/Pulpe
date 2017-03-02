import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { ROUTES } from './app.routes'; // ROUTING HERE!
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './Home/HomeComponent';
import { MenuBarComponent } from './MenuBar/MenuBarComponent';
import { SignupComponent } from './Signup/signup.component';
import { SigninComponent } from './Signin/signin.component';

import { MaterialModule } from '@angular/material';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MenuBarComponent,
        SignupComponent,
        SigninComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        RouterModule.forRoot(ROUTES)
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
