import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "angular-2-local-storage";
import {ProfileService} from "../../member/profile/profile.service";
import {AuthenticationService} from "../../_services/authentication/authentication.service";
import {Router} from "@angular/router";
import {AuthenticationProfile} from "../../_model/AuthenticationProfile";

@Component({
  selector: 'pulpe-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public authenticationProfile: AuthenticationProfile;

  constructor(public auth: AuthenticationService, private router: Router, public profileService: ProfileService, public localStorage: LocalStorageService) {
  }


  ngOnInit(): void {
    this.authenticationProfile = this.auth.getAuthenticationProfileInLocalStorage();
  }

  public signout(): void {
    this.auth.signout();
    this.router.navigateByUrl('');
  }
}
