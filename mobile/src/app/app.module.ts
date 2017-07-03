import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, Http, RequestOptions} from '@angular/http';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {Storage, IonicStorageModule} from '@ionic/storage';

import {MyApp} from './app.component';

import {CardsPage} from '../pages/cards/cards';
import {ContentPage} from '../pages/content/content';
import {ItemCreatePage} from '../pages/item-create/item-create';
import {ItemDetailPage} from '../pages/item-detail/item-detail';
import {ListMasterPage} from '../pages/list-master/list-master';
import {LoginPage} from '../pages/login/login';
import {MapPage} from '../pages/map/map';
import {MenuPage} from '../pages/menu/menu';
import {SearchPage} from '../pages/search/search';
import {SettingsPage} from '../pages/settings/settings';
import {SignupPage} from '../pages/signup/signup';
import {TabsPage} from '../pages/tabs/tabs';
import {TutorialPage} from '../pages/tutorial/tutorial';
import {WelcomePage} from '../pages/welcome/welcome';

import {Api} from '../providers/api';
import {Items} from '../mocks/providers/items';
import {Settings} from '../providers/settings';
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
import {ExerciseTrainingExecutionComponentModule} from "../components/exercise-training-execution/exercise-training-execution.module";
import { ExerciseBodybuildingExecutionComponent } from '../components/exercise-bodybuilding-execution/exercise-bodybuilding-execution';
import { ExerciseOrganizedExecutionComponent } from '../components/exercise-organized-execution/exercise-organized-execution';
import {TranslateObjectiveNamePipe} from "../shared/pipes/translateObjectiveName.filter.pipe";
import {TranslateWorkedMuscleName} from "../shared/pipes/workedMuscle.trad.filter.pipe";

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
    CardsPage,
    ContentPage,
    ItemCreatePage,
    ItemDetailPage,
    ListMasterPage,
    LoginPage,
    MapPage,
    MenuPage,
    SearchPage,
    SettingsPage,
    SignupPage,
    TabsPage,
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
    TranslateWorkedMuscleName
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TimerComponentModule,
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
    CardsPage,
    ContentPage,
    ItemCreatePage,
    ItemDetailPage,
    ListMasterPage,
    LoginPage,
    MapPage,
    MenuPage,
    SearchPage,
    SettingsPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    WelcomePage,
    SessionPage,
    SessionExecutionPage
  ],
  providers: [
    Api,
    Items,
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
    {provide: Settings, useFactory: provideSettings, deps: [Storage]},
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