import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "angular-2-local-storage";
import {ProfileService} from "../../profile/profile.service";
import {AuthenticationService} from "../../_services/authentication/authentication.service";
import {Router} from "@angular/router";
import {AuthenticationProfile} from "../../_model/AuthenticationProfile";

@Component({
    selector: 'pulpe-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    public authenticationProfile: AuthenticationProfile;

    constructor(public auth: AuthenticationService, private router: Router, public profileService: ProfileService, public localStorage: LocalStorageService) {
    }


    ngOnInit(): void {
        let profileInLocalStorage: string = this.localStorage.get<string>('profile');
        if (profileInLocalStorage) {
            this.authenticationProfile = JSON.parse(profileInLocalStorage);
        }
    }

    public signout(): void {
        this.auth.signout();
        this.router.navigateByUrl('');
    }
}
