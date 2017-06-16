import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {LocalStorageService} from "angular-2-local-storage/dist/index";
import {AuthenticationProfile} from "../_model/AuthenticationProfile";
import {Router} from '@angular/router';
import {ProfileService} from "../profile/profile.service";

@Injectable()
export class ProfileIsMemberGuardService implements CanActivate {

  constructor(private router: Router, private profileService: ProfileService) {
  }

  canActivate() {
    debugger;
    const profileIsCoach: boolean = this.profileService.profileIsCoach();
    if (profileIsCoach) {
      return false;
    }
    return true;
  }
}