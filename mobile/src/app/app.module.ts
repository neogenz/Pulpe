import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, Http, RequestOptions} from '@angular/http';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {Storage, IonicStorageModule} from '@ionic/storage';

import {MyApp} from './app.component';

import {LoginPage} from '../pages/login/login';
import {TutorialPage} from '../pages/tutorial/tutorial';
import {WelcomePage} from '../pages/welcome/welcome';

import {Api} from '../providers/api';
import {User} from '../providers/user';

import {Camera} from '@ionic-native/camera';
import {GoogleMaps} from '@ionic-native/google-maps';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TimerComponentModule} from "../components/timer/timer.module";
import {SessionPage} from "../pages/session/session";
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {SessionService} from "../providers/providers";
import {DifficultyConverter} from "../shared/converters/DifficultyConverter";
import {ExerciseGroupCodeConverter} from "../shared/converters/ExerciseGroupCodeConverter";
import {MuscleConverter} from "../shared/converters/MuscleConverter";
import {ObjectiveConveter} from "../shared/converters/ObjectiveConverter";
import {ExerciseTypeImgComponent} from '../components/exercise-type-img/exercise-type-img';
import {ExercisePreviewComponent} from '../components/exercise-preview/exercise-preview';
import {SessionExecutionPage} from "../pages/session-execution/session-execution";
import {ExerciseTrainingExecutionComponent} from '../components/exercise-training-execution/exercise-training-execution';
import {ExerciseExecutionComponent} from '../components/exercise-execution/exercise-execution';
import {ExerciseBodybuildingExecutionComponent} from '../components/exercise-bodybuilding-execution/exercise-bodybuilding-execution';
import {ExerciseOrganizedExecutionComponent} from '../components/exercise-organized-execution/exercise-organized-execution';
import {TranslateObjectiveNamePipe} from "../shared/pipes/translateObjectiveName.filter.pipe";
import {TranslateWorkedMuscleName} from "../shared/pipes/workedMuscle.trad.filter.pipe";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ExerciseCardioExecutionComponent } from '../components/exercise-cardio-execution/exercise-cardio-execution';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TutorialPage,
    WelcomePage,
    SessionPage,
    ExerciseTypeImgComponent,
    ExercisePreviewComponent,
    SessionExecutionPage,
    ExerciseExecutionComponent,
    ExerciseTrainingExecutionComponent,
    ExerciseBodybuildingExecutionComponent,
    ExerciseOrganizedExecutionComponent,
    TranslateObjectiveNamePipe,
    TranslateWorkedMuscleName,
    ExerciseCardioExecutionComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TimerComponentModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TutorialPage,
    WelcomePage,
    SessionPage,
    SessionExecutionPage
  ],
  providers: [
    Api,
    User,
    Camera,
    GoogleMaps,
    SessionService,
    SplashScreen,
    DifficultyConverter,
    ExerciseGroupCodeConverter,
    MuscleConverter,
    ObjectiveConveter,
    StatusBar,
    // Keep this to enable Ionic's runtime error handling during development
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, Storage]
    }
  ]
})
export class AppModule {
}

export function authHttpServiceFactory(http: Http, options: RequestOptions, storage: Storage) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => {
      return storage.get('token');
    }),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}