import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http'; //Http class used to can be imported manually in useFactory
import { RouterModule } from '@angular/router'
import { ROUTES } from './app.routes'; // ROUTING HERE!
import { APP_BASE_HREF } from '@angular/common';

import { MaterialModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { LocalStorageModule, LocalStorageService } from 'angular-2-local-storage';

import { AppComponent } from './app.component';
import { HomeComponent } from './Home/HomeComponent';
import { MenuBarComponent } from './MenuBar/MenuBarComponent';
import { SignupComponent } from './Signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ProfileCompletationComponent } from './profile-completation/profile-completation.component';
import { ProgramComponent } from './program/program.component';
import { environment } from '../environments/environment';
import { ProgramMockService  } from './program/program-mock.service';
import { ProgramService } from './program/program.service';
import { ExercisePreviewComponent } from './program/exercise-preview/exercise-preview.component'
import { ExerciseGroupCodeConverter } from "./shared/ExerciseGroupCodeConverter";
import { DifficultyConverter } from "./shared/DifficultyConverter";
import { SessionsComponent } from './sessions/sessions.component';
import { PageTitleComponent } from './shared/page-title/page-title.component';
import { SimpleCounterWithIconComponent } from './shared/simple-counter-with-icon/simple-counter-with-icon.component';
import { ExercisesRepartitionGraphComponent } from './exercises-repartition-graph/exercises-repartition-graph.component';
import {ProgramResolver} from "./program/program.resolver";
import { SessionObjectiveComponent } from './sessions/session-objective/session-objective.component';
import {AuthenticationService} from "./authentication.service";


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ProfileCompletationComponent,
    HomeComponent,
    MenuBarComponent,
    ProgramComponent,
    ExercisePreviewComponent,
    SessionsComponent,
    PageTitleComponent,
    SimpleCounterWithIconComponent,
    ExercisesRepartitionGraphComponent,
    SessionObjectiveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot(ROUTES),
    ChartsModule,
    LocalStorageModule.withConfig({
      prefix: 'pulpe',
      storageType: 'localStorage'
    })
  ],
  //Merry, look 'Become ninja Angular 2' to understand this :p
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: 'IS_PROD', useValue: true},
    {
      provide: ProgramService,
      useFactory: httpFactory,
      deps: ['IS_PROD', Http, LocalStorageService]
    },
    ExerciseGroupCodeConverter,
    DifficultyConverter,
    ProgramResolver,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function httpFactory(IS_PROD:boolean, http:Http, localStorage:LocalStorageService) {
  if (IS_PROD) {
    return new ProgramService(http, localStorage)
  }
  return new ProgramMockService();
}