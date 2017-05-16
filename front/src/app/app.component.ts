import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./_services/authentication/authentication.service";
import {Router} from '@angular/router';
import {ProfileService} from "./profile/profile.service";
import {LocalStorageService} from "angular-2-local-storage";
import {AuthenticationProfile} from "./_model/AuthenticationProfile";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _opened: boolean = false;
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

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
