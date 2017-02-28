import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PulpeAppComponent } from './app.component';
import { HomeComponent } from './components/Home/HomeComponent';
import { MenuBarComponent } from './components/MenuBar/MenuBarComponent';
import { SigninComponent } from './components/Signin/SigninComponent';
import { RouterModule } from '@angular/router'
import { ROUTES } from './app.routes'; // ROUTING HERE!
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(ROUTES)],
    declarations: [
        PulpeAppComponent,
        MenuBarComponent,
        HomeComponent,
        SigninComponent
    ],
    bootstrap: [PulpeAppComponent],
    providers:[
      {provide: APP_BASE_HREF, useValue : '/' }
    ]
})
export class PulpeModule {
}
