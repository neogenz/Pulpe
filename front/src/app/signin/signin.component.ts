import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthenticationService} from "../_services/authentication/authentication.service";
import {Observable} from "rxjs/Observable";
import {SlimLoadingBarService} from "ng2-slim-loading-bar/index";
import {Router} from '@angular/router';
import {LocalStorageService} from "angular-2-local-storage/dist/index";
import {AuthenticationProfile} from "../_model/AuthenticationProfile";
import {OnError} from "../_helpers/IUIErrorHandlerHelper";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Animations} from "../shared/Animations";
//import {document} from "@angular/platform-browser/src/facade/browser";

@Component({
	selector: 'pulpe-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss'],
	animations: [Animations.fadeIn()]
})
export class SigninComponent implements OnInit, OnError, OnDestroy {
	authenticationRequest: Observable<AuthenticationProfile> = new Observable();
	signing: boolean = false;
	signinForm: FormGroup;
	emailCtrl: FormControl;
	passwordCtrl: FormControl;
	isInError: boolean;
	errorMsg: string;
	win: any = typeof window !== 'undefined' && window || {};

	constructor(private localStorage: LocalStorageService, private authenticationService: AuthenticationService, private slimLoadingBarService: SlimLoadingBarService, private router: Router, fb: FormBuilder) {
		this.emailCtrl = fb.control('', Validators.required);
		this.passwordCtrl = fb.control('', [Validators.required, Validators.minLength(6)]);
		this.signinForm = fb.group({
			email: this.emailCtrl,
			password: this.passwordCtrl,
			rememberMe: [false]
		});
	}

	ngOnInit() {
		let profileInLocalStorage: string = this.localStorage.get<string>('profile');
		if (profileInLocalStorage) {
			let profile: AuthenticationProfile = JSON.parse(profileInLocalStorage);
			if (profile.rememberMe) {
				this.signinForm.get('password').setValue(profile.password);
				this.emailCtrl.setValue(profile.login);
				this.signinForm.get('rememberMe').setValue(true);
			}
		}
		this.win.document.body.className = "landing-page";
	}

	ngOnDestroy() {
		this.win.document.body.className = "";
	}

	signin(): void {
		this.signing = true;
		this.authenticationRequest = this.authenticationService.signin(this.emailCtrl.value, this.signinForm.get('password').value);
		this.slimLoadingBarService.start();
		this.authenticationRequest
			.finally(() => {
				this.signing = false;
				this.slimLoadingBarService.complete();
			})
			.subscribe((authProfile) => {
					if (authProfile.isCoach) {
						this.router.navigateByUrl('/accueil/coach');
					} else {
						this.router.navigateByUrl('/accueil');
					}
					authProfile.rememberMe = this.signinForm.get('rememberMe').value;
					this.localStorage.set('profile', JSON.stringify(authProfile));
				},
				(errorMsg) => {
					this.displayErrorMsg(errorMsg);
				}
			);
	}

	displayErrorMsg(errorMsg: string) {
		this.errorMsg = errorMsg;
		this.isInError = true;
	}

	hideErrorMsg() {
		this.errorMsg = '';
		this.isInError = false;
	}
}
