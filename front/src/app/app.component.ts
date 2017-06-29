import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./_services/authentication/authentication.service";
import {Router} from '@angular/router';
import {ProfileService} from "./member/profile/profile.service";
import {LocalStorageService} from "angular-2-local-storage";
import {AuthenticationProfile} from "./_model/AuthenticationProfile";
import * as moment from "moment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _opened: boolean = false;
  public authenticationProfile: AuthenticationProfile;

  constructor(public auth: AuthenticationService, public profileService: ProfileService, public localStorage: LocalStorageService, private _router: Router) {
    moment.locale('fr');
    console.log(moment.locale());
  }

  ngOnInit(): void {
    this.authenticationProfile = this.auth.getAuthenticationProfileInLocalStorage();
  }

  private toggleSidebar() {
    this._opened = !this._opened;
  }

  public footerMustBeDisplayed(): boolean {
    let currentUrl: string = this._router.url;
    return (currentUrl !== '/'
    && currentUrl !== '/connexion'
    && currentUrl !== '/inscription');
  }
}
