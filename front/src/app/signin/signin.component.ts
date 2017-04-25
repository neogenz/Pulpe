import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../_services/authentication/authentication.service";
import {Observable} from "rxjs/Observable";
import {SlimLoadingBarService} from "ng2-slim-loading-bar/index";
import { Router } from '@angular/router';
import {LocalStorageService} from "angular-2-local-storage/dist/index";
import {AuthenticationProfile} from "../model/AuthenticationProfile";

@Component({
  selector: 'pulpe-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private localStorage:LocalStorageService, private authenticationService:AuthenticationService, private slimLoadingBarService:SlimLoadingBarService, private router:Router) {
  }

  public authenticationRequest:Observable<AuthenticationProfile> = new Observable();
  public authenticationProfile:AuthenticationProfile = AuthenticationProfile.of().build();
  public signing:boolean = false;
  public displaySigninError:boolean = false;
  public errorMessage:string = null;

  ngOnInit() {
    let profileInLocalStorage:string = this.localStorage.get<string>('profile');
    if (profileInLocalStorage) {
      let profile:AuthenticationProfile = JSON.parse(profileInLocalStorage);
      if (profile.rememberMe) {
        this.authenticationProfile = profile;
      }
    }
  }

  public signin():void {
    this.signing = true;
    this.authenticationRequest = this.authenticationService.signin(this.authenticationProfile.login, this.authenticationProfile.password);
    this.slimLoadingBarService.start();
    this.authenticationRequest
      .finally(() => {
        this.signing = false;
        this.slimLoadingBarService.complete();
      })
      .subscribe((authProfile)=> {
          this.router.navigateByUrl('/programme');
          this.localStorage.set('profile', JSON.stringify(this.authenticationProfile));
        },
        (error)=> {
          this.displaySigninError = true;
          this.errorMessage = error.message;
        }
      );
  }
}
