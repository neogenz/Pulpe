import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../_services/authentication/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private auth:AuthenticationService, private router:Router) {
  }

  canActivate() {
    // If user is not logged in we'll send them to the homepage
    if (!this.auth.authenticated()) {
      this.router.navigate(['/connexion']);
      return false;
    }
    return true;
  }

}