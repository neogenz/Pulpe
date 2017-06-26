import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Router} from '@angular/router';
import {ProfileService} from "../member/profile/profile.service";

@Injectable()
export class ProfileIsCoachGuardService implements CanActivate {

  constructor(private router: Router, private profileService: ProfileService) {
  }

  canActivate() {
    return this.profileService.profileIsCoach();
  }
}