import {Component} from '@angular/core';
import {AuthenticationService} from "./_services/authentication/authentication.service";
import {Router} from '@angular/router';
import {ProfileService} from "./profile/profile.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public profileIsCompleted: boolean = false;
    public authenticated: boolean = false;
    private _opened: boolean = false;

    constructor(public auth: AuthenticationService, private router: Router, public profileService: ProfileService) {
        this.profileIsCompleted = this.profileService.profileIsCompleted();
        this.authenticated = this.auth.authenticated();
    }

    public signout(): void {
        this.auth.signout();
        this.router.navigateByUrl('');
        this.authenticated = false;
        this.profileIsCompleted = false;
    }

    private _toggleSidebar() {
        this._opened = !this._opened;
    }
}
