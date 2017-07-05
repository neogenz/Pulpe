import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SigninComponent} from './signin/signin.component';
import {EvolutionComponent} from './member/evolution/evolution.component';
import {ProgramComponent} from './member/program/program.component';
import {SignupComponent} from './Signup/signup.component';
import {ProfileCompletationComponent} from './member/profile/profile-completation/profile-completation.component';
import {ProfileCompletationCoachComponent} from './coach/profile/profile-completation-coach/profile-completation-coach.component';
import {SessionsComponent} from "./member/sessions/sessions.component";
import {ProgramResolver} from "./member/program/program.resolver";
import {AuthenticationGuard} from "./_guards/authentication-guard.service";
import {WelcomeComponent} from "./welcome/welcome.component";
import {ProfileComponent} from "./member/profile/profile.component";
import {SessionsResolver} from "./member/sessions/sessions.resolver";
import {ProfileResolver} from "./member/profile/profile.resolver";
import {EvolutionResolver} from "./member/evolution/evolution.resolver";
import {ProfileCompletedGuardService} from "./_guards/profile-completed-guard.service";
import {ProfileIsMemberGuardService} from "./_guards/profile-is-member-guard.service";
import {MembersComponent} from "./coach/members/members.component";
import {MachinesComponent} from "./coach/machines/machines.component";
import {ProfileIsCoachGuardService} from "./_guards/profile-is-coach-guard.service";
import {MembersResolver} from "./coach/members/members.resolver";
import {MachinesResolver} from "./coach/machines/machines.resolver";
import {ExercisesComponent} from "./coach/exercises/exercises.component";
import {ExerciseResolver} from "./coach/exercises/exercises.resolver";
import {ProfileCoachComponent} from "./coach/profile/profile-coach.component";
import {ProfileCoachResolver} from "./coach/profile/profile-coach.resolver";
import {HomeCoachComponent} from "./coach/home-coach/home-coach.component";
import {HomeCoachResolver} from "./coach/home-coach/home-coach.resolver";
import {ProgramMemberComponent} from "./coach/members/program-member/program-member.component";
import {ProgramMemberResolver} from "./coach/members/program-member/program-member.resolver";
import {MemberResolver} from "./coach/members/program-member/member.resolver";


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
		path: 'accueil/coach',
		component: HomeCoachComponent,
		canActivate: [AuthenticationGuard, ProfileCompletedGuardService, ProfileIsCoachGuardService],
		resolve: {
			dashboard: HomeCoachResolver,
		}
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
		path: 'adherents/programme/:id',
		component: ProgramMemberComponent,
		resolve: {
			program: ProgramMemberResolver,
			member: MemberResolver
		},
		canActivate: [AuthenticationGuard, ProfileCompletedGuardService, ProfileIsCoachGuardService]
	},
	{
		path: 'evolution/:id',
		component: EvolutionComponent,
		canActivate: [AuthenticationGuard, ProfileCompletedGuardService, ProfileIsMemberGuardService],
		resolve: {
			member: ProfileResolver,
			efficientPrevisions: EvolutionResolver
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
		path: 'profile/member/:id',
		component: ProfileComponent,
		canActivate: [AuthenticationGuard, ProfileCompletedGuardService],
		resolve: {
			profile: ProfileResolver
		}
	},
	{
		path: 'profile/coach',
		component: ProfileCoachComponent,
		canActivate: [AuthenticationGuard, ProfileCompletedGuardService],
		resolve: {
			profile: ProfileCoachResolver
		}
	},
	{
		path: 'profil/adherent/complete',
		component: ProfileCompletationComponent,
		canActivate: [AuthenticationGuard]
	},
	{
		path: 'profil/coach/complete',
		component: ProfileCompletationCoachComponent,
		canActivate: [AuthenticationGuard]
	},
	{
		path: 'adherents',
		component: MembersComponent,
		canActivate: [AuthenticationGuard, ProfileCompletedGuardService, ProfileIsCoachGuardService],
		resolve: {
			members: MembersResolver
		}
	},
	{
		path: 'machines',
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
