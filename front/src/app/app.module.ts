import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, Http, RequestOptions} from '@angular/http'; //Http class used to can be imported manually in useFactory
import {RouterModule} from '@angular/router'
import {ROUTES} from './app.routes'; // ROUTING HERE!
import {APP_BASE_HREF} from '@angular/common';

import {MaterialModule} from '@angular/material';
import {ChartsModule} from 'ng2-charts';
import {LocalStorageModule, LocalStorageService} from 'angular-2-local-storage';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {SignupComponent} from './Signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {ProfileCompletationComponent} from './profile/profile-completation/profile-completation.component';
import {ProgramComponent} from './program/program.component';
import {ProgramMockService} from './program/program-mock.service';
import {ProgramService} from './program/program.service';
import {ExercisePreviewComponent} from './program/exercise-preview/exercise-preview.component'
import {ExerciseGroupCodeConverter} from "./shared/ExerciseGroupCodeConverter";
import {DifficultyConverter} from "./shared/DifficultyConverter";
import {SessionsComponent} from './sessions/sessions.component';
import {PageTitleComponent} from './shared/page-title/page-title.component';
import {SimpleCounterWithIconComponent} from './shared/simple-counter-with-icon/simple-counter-with-icon.component';
import {ExercisesRepartitionGraphComponent} from './program/exercises-repartition-graph/exercises-repartition-graph.component';
import {ProgramResolver} from "./program/program.resolver";
import {SessionObjectiveComponent} from './sessions/session-objective/session-objective.component';
import {AuthenticationService} from "./_services/authentication/authentication.service";
import {AuthenticationGuard} from './_guards/authentication-guard.service';
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {SlimLoadingBarModule} from "ng2-slim-loading-bar/index";
import {AuthConfig} from "angular2-jwt/angular2-jwt";
import {WelcomeComponent} from './welcome/welcome.component';
import {SessionListComponent} from "./sessions/session-list/session-list.component";
import {SessionsResolver} from "./sessions/sessions.resolver";
import {SessionsService} from "./sessions/sessions.service";
import {EvolutionComponent} from './evolution/evolution.component';
import {EfficientLineGraphComponent} from './evolution/efficient-line-graph/efficient-line-graph.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfilePhotoComponent} from './profile/profile-photo/profile-photo.component';
import {ProfileInfosComponent} from './profile/profile-infos/profile-infos.component';
import {ProfileService} from './profile/profile.service';
import {ProfileCompletedGuardService} from './_guards/profile-completed-guard.service';
import {ProfileIsMemberGuardService} from './_guards/profile-is-member-guard.service';
import {MeasurementEnumService} from './_services/measurement-enum.service';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {NgxErrorsModule} from '@ultimate/ngxerrors';
import {SidebarModule} from 'ng-sidebar';
import {FooterComponent} from './shared/footer/footer.component';
import {MemberService} from "./_services/member/member.service";
import {ProfileResolver} from "./profile/profile.resolver";
import {MeasurementsListComponent} from './evolution/measurements-list/measurements-list.component';
import {MeasurementsAddDialogComponent} from './evolution/measurements-add-dialog/measurements-add-dialog.component';
import {BootstrapModalModule} from "ng2-bootstrap-modal";
import {EvolutionResolver} from "./evolution/evolution.resolver";
import {ProfileCompletationCoachComponent} from './profile/profile-completation-coach/profile-completation-coach.component';
import {GymService} from "./_services/gym/gym.service";
import {CoachService} from "./_services/coach/coach.service";
import {ProfileMemberEditDialogComponent} from './profile/profile-member-edit-dialog/profile-member-edit-dialog.component';
import {MembersComponent} from './members/members.component';
import {ProfileIsCoachGuardService} from "./_guards/profile-is-coach-guard.service";
import {MembersResolver} from "./members/members.resolver";
import {ObjectiveEnumService} from "./_services/objective-enum.service";
import {FilterMembers} from "./members/members.filter.pipe";
import {MachinesComponent} from './machines/machines.component';
import {MachinesResolver} from "./machines/machines.resolver";
import {FilterMachines} from "./machines/machines.filter.pipe";
import {MachineService} from "./_services/machine/machine.service";

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ProfileCompletationComponent,
    HomeComponent,
    ProgramComponent,
    ExercisePreviewComponent,
    SessionsComponent,
    PageTitleComponent,
    SimpleCounterWithIconComponent,
    ExercisesRepartitionGraphComponent,
    SessionObjectiveComponent,
    WelcomeComponent,
    SessionListComponent,
    EvolutionComponent,
    EfficientLineGraphComponent,
    ProfileComponent,
    ProfilePhotoComponent,
    ProfileInfosComponent,
    SidebarComponent,
    FooterComponent,
    MeasurementsListComponent,
    MeasurementsAddDialogComponent,
    ProfileCompletationCoachComponent,
    ProfileMemberEditDialogComponent,
    MembersComponent,
    FilterMembers,
    FilterMachines,
    MachinesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartsModule,
    ReactiveFormsModule,
    NgxErrorsModule,
    BootstrapModalModule,
    RouterModule.forRoot(ROUTES),
    SlimLoadingBarModule.forRoot(),
    SidebarModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: '',
      storageType: 'localStorage'
    })
  ],
  //Merry, look 'Become ninja Angular 2' to understand this :p
  providers: [
    {
      provide: APP_BASE_HREF, useValue: '/'
    },
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, LocalStorageService]
    },
    {
      provide: 'IS_PROD', useValue: true
    },
    {
      provide: MemberService,
      useFactory: memberServiceFactory,
      deps: ['IS_PROD', LocalStorageService, AuthHttp]
    },
    {
      provide: ProgramService,
      useFactory: programServiceFactory,
      deps: ['IS_PROD', LocalStorageService, AuthHttp]
    },
    {
      provide: AuthenticationService,
      useFactory: authenticationServiceFactory,
      deps: ['IS_PROD', LocalStorageService, Http]
    },
    SessionsService,
    ExerciseGroupCodeConverter,
    DifficultyConverter,
    ProgramResolver,
    SessionsResolver,
    EvolutionResolver,
    ProfileResolver,
    ProfileService,
    MembersResolver,
    MachinesResolver,
    AuthenticationGuard,
    ProfileCompletedGuardService,
    ProfileIsMemberGuardService,
    ProfileIsCoachGuardService,
    MeasurementEnumService,
    ObjectiveEnumService,
    MachineService,
    GymService,
    CoachService
  ],
  entryComponents: [
    MeasurementsAddDialogComponent,
    ProfileMemberEditDialogComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

export function programServiceFactory(IS_PROD: boolean, localStorage: LocalStorageService, authHttp: AuthHttp): any {
  if (IS_PROD) {
    return new ProgramService(authHttp, localStorage)
  }
  return new ProgramMockService();
}

export function memberServiceFactory(IS_PROD: boolean, localStorage: LocalStorageService, http: Http) {
  //if (IS_PROD) {
  return new MemberService(http, localStorage);
  //}
  //return new MemberMockService(localStorage);
}

export function authenticationServiceFactory(IS_PROD: boolean, localStorage: LocalStorageService, http: Http) {
  //if (IS_PROD) {
  return new AuthenticationService(http, localStorage);
  //}
  //return new AuthenticationMockService(localStorage);
}

export function authHttpServiceFactory(http: Http, options: RequestOptions, localStorage: LocalStorageService) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.get('token').toString()),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}
