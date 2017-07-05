import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {LocalStorageService} from "angular-2-local-storage/dist/index";
import {AuthenticationProfile} from "../_model/AuthenticationProfile";
import {Router} from '@angular/router';
import {ProfileService} from "../member/profile/profile.service";

@Injectable()
export class ProfileCompletedGuardService implements CanActivate {

  constructor(private router: Router, private profileService: ProfileService) {
  }

  canActivate() {
    const profileIsCompleted: boolean = this.profileService.profileIsCompleted();
    if (!profileIsCompleted) {
      const profileIsCoach: boolean = this.profileService.profileIsCoach();
      if(profileIsCoach) {
        this.router.navigate(['/profil/coach/complete']);
      } else {
        this.router.navigate(['/profil/adherent/complete']);
      }
      return false;
    }
    return true;
  }
}
