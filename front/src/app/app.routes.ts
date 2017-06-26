import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SigninComponent} from './signin/signin.component';
import {EvolutionComponent} from './evolution/evolution.component';
import {ProgramComponent} from './program/program.component';
import {SignupComponent} from './Signup/signup.component';
import {ProfileCompletationComponent} from './profile/profile-completation/profile-completation.component';
import {ProfileCompletationCoachComponent} from './profile/profile-completation-coach/profile-completation-coach.component';
import {SessionsComponent} from "./sessions/sessions.component";
import {ProgramResolver} from "./program/program.resolver";
import {AuthenticationGuard} from "./_guards/authentication-guard.service";
import {WelcomeComponent} from "./welcome/welcome.component";
import {ProfileComponent} from "./profile/profile.component";
import {SessionsResolver} from "./sessions/sessions.resolver";
import {ProfileResolver} from "./profile/profile.resolver";
import {EvolutionResolver} from "./evolution/evolution.resolver";
import {ProfileCompletedGuardService} from "./_guards/profile-completed-guard.service";
import {ProfileIsMemberGuardService} from "./_guards/profile-is-member-guard.service";
import {MembersComponent} from "./members/members.component";
import {MachinesComponent} from "./machines/machines.component";
import {ProfileIsCoachGuardService} from "./_guards/profile-is-coach-guard.service";
import {MembersResolver} from "./members/members.resolver";
import {MachinesResolver} from "./machines/machines.resolver";
import {ExercisesComponent} from "./exercises/exercises.component";
import {ExerciseResolver} from "./exercises/exercises.resolver";


// Route Configuration
export const ROUTES: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'accueil',
    component: HomeComponent,
    canActivate: [AuthenticationGuard, ProfileCompletedGuardService]
  },
  {
    path: 'inscription',
    component: SignupComponent
  },
  {
    path: 'connexion',
    component: SigninComponent
  },
  {
    path: 'programme',
    component: ProgramComponent,
    resolve: {
      program: ProgramResolver,
    },
    canActivate: [AuthenticationGuard, ProfileCompletedGuardService, ProfileIsMemberGuardService]
  },
  {
    path: 'evolution/:id',
    component: EvolutionComponent,
    canActivate: [AuthenticationGuard, ProfileCompletedGuardService, ProfileIsMemberGuardService],
    resolve: {
      evolution: EvolutionResolver
    }
  },
  {
    path: 'seances',
    component: SessionsComponent,
    canActivate: [AuthenticationGuard, ProfileCompletedGuardService, ProfileIsMemberGuardService],
    resolve: {
      sessions: SessionsResolver
    }
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthenticationGuard, ProfileCompletedGuardService],
    resolve: {
      profile: ProfileResolver
    }
  },
  {
    path: 'profil/member/complete',
    component: ProfileCompletationComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'profil/coach/complete',
    component: ProfileCompletationCoachComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'adherents/:idCoach',
    component: MembersComponent,
    canActivate: [AuthenticationGuard, ProfileCompletedGuardService, ProfileIsCoachGuardService],
    resolve: {
      members: MembersResolver
    }
  },
  {
    path: 'machines/:idCoach',
    component: MachinesComponent,
    canActivate: [AuthenticationGuard, ProfileCompletedGuardService, ProfileIsCoachGuardService],
    resolve: {
      machines: MachinesResolver
    }
  },
  {
    path: 'exercices',
    component: ExercisesComponent,
    canActivate: [AuthenticationGuard, ProfileCompletedGuardService, ProfileIsCoachGuardService],
    resolve: {
      exercisesGroups: ExerciseResolver
    }
  }
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];
