import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, Http, RequestOptions} from '@angular/http'; //Http class used to can be imported manually in useFactory
import {RouterModule} from '@angular/router'
import {ROUTES} from './app.routes'; // ROUTING HERE!
import {APP_BASE_HREF} from '@angular/common';

import {ChartsModule} from 'ng2-charts';
import {LocalStorageModule, LocalStorageService} from 'angular-2-local-storage';
import {
	MdInputModule,
	MdCheckboxModule,
	MdSelectModule,
	MdCardModule,
	MdProgressSpinnerModule,
	MdTabsModule,
	MdRadioModule,
	MdTooltipModule,
	MdChipsModule,
	MdButtonModule, MdDatepickerModule, MdNativeDateModule
} from '@angular/material';


import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {SignupComponent} from './Signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {ProfileCompletationComponent} from './member/profile/profile-completation/profile-completation.component';
import {ProgramComponent} from './member/program/program.component';
import {ProgramMockService} from './member/program/program-mock.service';
import {ProgramService} from './member/program/program.service';
import {ExercisePreviewComponent} from './member/program/exercise-preview/exercise-preview.component'
import {ExerciseGroupCodeConverter} from "./shared/ExerciseGroupCodeConverter";
import {DifficultyConverter} from "./shared/DifficultyConverter";
import {SessionsComponent} from './member/sessions/sessions.component';
import {PageTitleComponent} from './shared/page-title/page-title.component';
import {SimpleCounterWithIconComponent} from './shared/simple-counter-with-icon/simple-counter-with-icon.component';
import {ExercisesRepartitionGraphComponent} from './member/program/exercises-repartition-graph/exercises-repartition-graph.component';
import {ProgramResolver} from "./member/program/program.resolver";
import {SessionObjectiveComponent} from './member/sessions/session-objective/session-objective.component';
import {AuthenticationService} from "./_services/authentication/authentication.service";
import {AuthenticationGuard} from './_guards/authentication-guard.service';
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {SlimLoadingBarModule} from "ng2-slim-loading-bar/index";
import {AuthConfig} from "angular2-jwt/angular2-jwt";
import {WelcomeComponent} from './welcome/welcome.component';
import {SessionListComponent} from "./member/sessions/session-list/session-list.component";
import {SessionsResolver} from "./member/sessions/sessions.resolver";
import {SessionsService} from "./member/sessions/sessions.service";
import {EvolutionComponent} from './member/evolution/evolution.component';
import {EfficientLineGraphComponent} from './member/evolution/efficient-line-graph/efficient-line-graph.component';
import {ProfileComponent} from './member/profile/profile.component';
import {ProfilePhotoComponent} from './shared/profile/profile-photo/profile-photo.component';
import {ProfileInfosComponent} from './member/profile/profile-infos/profile-infos.component';
import {ProfileService} from './member/profile/profile.service';
import {ProfileCompletedGuardService} from './_guards/profile-completed-guard.service';
import {ProfileIsMemberGuardService} from './_guards/profile-is-member-guard.service';
import {MeasurementEnumService} from './_services/measurement-enum.service';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {NgxErrorsModule} from '@ultimate/ngxerrors';
import {SidebarModule} from 'ng-sidebar';
import {FooterComponent} from './shared/footer/footer.component';
import {MemberService} from "./_services/member/member.service";
import {ProfileResolver} from "./member/profile/profile.resolver";
import {MeasurementsListComponent} from './member/evolution/measurements-list/measurements-list.component';
import {MeasurementsAddDialogComponent} from './member/evolution/measurements-add-dialog/measurements-add-dialog.component';
import {BootstrapModalModule} from "ng2-bootstrap-modal";
import {EvolutionResolver} from "./member/evolution/evolution.resolver";
import {ProfileCompletationCoachComponent} from './coach/profile/profile-completation-coach/profile-completation-coach.component';
import {GymService} from "./_services/gym/gym.service";
import {CoachService} from "./_services/coach/coach.service";
import {MembersComponent} from './coach/members/members.component';
import {ProfileIsCoachGuardService} from "./_guards/profile-is-coach-guard.service";
import {MembersResolver} from "./coach/members/members.resolver";
import {FilterMembers} from "./coach/members/members.filter.pipe";
import {MachinesComponent} from './coach/machines/machines.component';
import {MachinesResolver} from "./coach/machines/machines.resolver";
import {FilterMachines} from "./coach/machines/machines.filter.pipe";
import {MachineService} from "./_services/machine/machine.service";
import {MachineFormDialogComponent} from './coach/machines/machine-form-dialog/machine-form-dialog.component';

import {MuscleConverter} from "./shared/MuscleConverter";
import {ExercisesComponent} from './coach/exercises/exercises.component';
import {ToastrModule} from "ngx-toastr";
import {ExerciseResolver} from "./coach/exercises/exercises.resolver";
import {ExerciseService} from "./coach/exercises/exercise.service";
import {ExercisesListComponent} from './coach/exercises/exercises-list/exercises-list.component';
import {ExercisesTypeImgComponent} from './coach/exercises/exercises-type-img/exercises-type-img.component';
import {ExerciseFormDialogComponent} from './coach/exercises/exercise-form-dialog/exercise-form-dialog.component';
import {SelectWorkedMuscleComponent} from './shared/form/select-worked-muscle/select-worked-muscle.component';
import {ChipsRemovableWorkedMuscleComponent} from './shared/form/chips-removable-worked-muscle/chips-removable-worked-muscle.component';
import {TranslateWorkedMuscleName} from "./shared/pipes/workedMuscle.trad.filter.pipe";
import {DeleteDialogComponent} from './shared/dialogs/delete-dialog/delete-dialog.component';
import {HeaderListComponent} from './shared/lists/header-list/header-list.component';
import {ProfileCoachComponent} from './coach/profile/profile-coach.component';
import {ProfileInfosCoachComponent} from './coach/profile/profile-infos-coach/profile-infos-coach.component';
import {ProfileCoachResolver} from "./coach/profile/profile-coach.resolver";
import {ProfileCoachEditDialogComponent} from './coach/profile/profile-coach-edit-dialog/profile-coach-edit-dialog.component';
import {SelectMachinesComponent} from "./shared/form/select-machines/select-machines.component";
import {SpecificExerciseFormBuilderService} from "./coach/exercises/exercise-form-dialog/specific-exercise-form-builder.service";
import {ProfileMemberFormDialogComponent} from "./shared/profile/profile-member-form-dialog/profile-member-form-dialog.component";
import {FilterExercisesPipe} from './coach/exercises/filter-exercises.pipe';
import {MachineDetailsDialogComponent} from './coach/machines/machine-details-dialog/machine-details-dialog.component';
import {ExerciseSpecificPropertiesFormDialogComponent} from './member/exercise/exercise-specific-properties-form-dialog/exercise-specific-properties-form-dialog.component';
import {SpecificExercisePropertiesFormBuilderService} from "./member/exercise/exercise-specific-properties-form-dialog/specific-exercise-properties-form-builder.service";
import {TranslateObjectiveNamePipe} from "./shared/pipes/translateObjectiveName.filter.pipe";
import {ObjectiveConveter} from "./shared/ObjectiveConverter";
import {MeasurementGraphComponent} from './member/evolution/measurement-graph/measurement-graph.component';
import {MeasurementConverter} from "./shared/MeasurementConverter";
import {EvolutionService} from "./member/evolution/evolution.service";
import { HomeCoachComponent } from './coach/home-coach/home-coach.component';
import {HomeCoachResolver} from "./coach/home-coach/home-coach.resolver";
import {HomeCoachService} from "./coach/home-coach/home-coach.service";
import { SessionExecutionStateComponent } from './member/sessions/session-execution-state/session-execution-state.component';

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
		ProfileCoachEditDialogComponent,
		MembersComponent,
		FilterMembers,
		FilterMachines,
		TranslateWorkedMuscleName,
		MachinesComponent,
		MachineFormDialogComponent,
		ExercisesComponent,
		ExercisesListComponent,
		ExercisesTypeImgComponent,
		ExerciseFormDialogComponent,
		SelectWorkedMuscleComponent,
		ChipsRemovableWorkedMuscleComponent,
		DeleteDialogComponent,
		SelectMachinesComponent,
		ProfileCoachComponent,
		HeaderListComponent,
		ProfileInfosCoachComponent,
		ProfileMemberFormDialogComponent,
		FilterExercisesPipe,
		TranslateObjectiveNamePipe,
		MachineDetailsDialogComponent,
		ExerciseSpecificPropertiesFormDialogComponent,
		MeasurementGraphComponent,
		HomeCoachComponent
	],
	imports: [
		MdButtonModule,
		MdChipsModule,
		MdTooltipModule,
		MdInputModule,
		MdSelectModule,
		MdProgressSpinnerModule,
		MdRadioModule,
		MdCheckboxModule,
		MdTabsModule,
		MdCardModule,
		BrowserModule,
		MdNativeDateModule,
		FormsModule,
		MdCheckboxModule,
		MdDatepickerModule,
		HttpModule,
		BrowserAnimationsModule,
		ChartsModule,
		ReactiveFormsModule,
		NgxErrorsModule,
		BootstrapModalModule,
		RouterModule.forRoot(ROUTES),
		SlimLoadingBarModule.forRoot(),
		SidebarModule.forRoot(),
		ToastrModule.forRoot(),
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
		ObjectiveConveter,
		HomeCoachResolver,
		MeasurementConverter,
		MuscleConverter,
		ProgramResolver,
		SessionsResolver,
		ProfileCoachResolver,
		EvolutionResolver,
		ProfileResolver,
		HomeCoachService,
		ProfileService,
		EvolutionService,
		MembersResolver,
		ExerciseResolver,
		ExerciseService,
		MachinesResolver,
		AuthenticationGuard,
		ProfileCompletedGuardService,
		ProfileIsMemberGuardService,
		ProfileIsCoachGuardService,
		MeasurementEnumService,
		MachineService,
		GymService,
		CoachService,
		SpecificExerciseFormBuilderService,
		SpecificExercisePropertiesFormBuilderService
	],
	entryComponents: [
		MeasurementsAddDialogComponent,
		ProfileMemberFormDialogComponent,
		ExerciseFormDialogComponent,
		MachineFormDialogComponent,
		DeleteDialogComponent,
		ProfileCoachEditDialogComponent,
		MachineDetailsDialogComponent,
		ExerciseSpecificPropertiesFormDialogComponent
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
