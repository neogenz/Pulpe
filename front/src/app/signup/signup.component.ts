import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../_services/authentication/authentication.service";
import {Observable} from "rxjs/Observable";
import {SlimLoadingBarService} from "ng2-slim-loading-bar/index";
import {Router} from '@angular/router';
import {LocalStorageService} from "angular-2-local-storage/dist/index";
import {AuthenticationProfile} from "../model/AuthenticationProfile";


@Component({
    selector: 'pulpe-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    constructor(private localStorage: LocalStorageService, private authenticationService: AuthenticationService, private slimLoadingBarService: SlimLoadingBarService, private router: Router) {
    }

    public authenticationRequest: Observable<AuthenticationProfile> = new Observable();
    public authenticationProfile: AuthenticationProfile = AuthenticationProfile.of().build();
    public subscribing: boolean = false;
    public displaySignupError: boolean = false;
    public errorMessage: string = null;

    ngOnInit() {
    }

    public signup(): void {
        debugger;
        this.subscribing = true;
        this.authenticationRequest = this.authenticationService
            .signup(this.authenticationProfile.firstName, this.authenticationProfile.lastName, this.authenticationProfile.login, this.authenticationProfile.password);
        this.slimLoadingBarService.start();
        this.authenticationRequest
            .finally(() => {
                this.subscribing = false;
                this.slimLoadingBarService.complete();
            })
            .subscribe((userDTO) => {
                    this.router.navigateByUrl('/programme');
                    this.localStorage.set('profile', JSON.stringify(this.authenticationProfile));
                },
                (error) => {
                    debugger;
                    this.displaySignupError = true;
                    this.errorMessage = error.message;
                }
            );
    }
}
