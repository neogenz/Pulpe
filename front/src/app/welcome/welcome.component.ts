import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthenticationService} from "../_services/authentication/authentication.service";
import {Router} from '@angular/router';
//import {document} from "@angular/platform-browser/src/facade/browser";

@Component({
	selector: 'pulpe-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
	win: any = typeof window !== 'undefined' && window || {};

	constructor(private authService: AuthenticationService, private router: Router) {
	}

	ngOnInit() {
		if (this.authService.authenticated()) {
			const authenticationProfile = this.authService.getAuthenticationProfileInLocalStorage();
			if (authenticationProfile.isCoach) {
				this.router.navigateByUrl('/accueil/coach');
			} else {
				this.router.navigateByUrl('/programme');
			}
		}
		this.win.document.body.className = "landing-page";
	}

	ngOnDestroy() {
		this.win.document.body.className = "";
	}
}
