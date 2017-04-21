import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../_services/authentication/authentication.service";
import {AuthenticateDTO} from "../_services/authentication/authentication.service";
import {Observable} from "rxjs/Observable";
import {SlimLoadingBarService} from "ng2-slim-loading-bar/index";
import { Router } from '@angular/router';

@Component({
  selector: 'pulpe-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService, private slimLoadingBarService:SlimLoadingBarService, private router:Router) {
  }

  public authenticate:Observable<AuthenticateDTO> = new Observable();
  public signing:Boolean = false;
  public login:string = '';
  public password:string = '';

  ngOnInit() {
  }

  public signin():void {
    this.signing = true;
    console.log(this.login, this.password);
    this.authenticate = this.authenticationService.signin(this.login, this.password);
    this.slimLoadingBarService.start();
    this.authenticate
      .finally(() => {
        this.signing = false;
        this.slimLoadingBarService.complete();
      })
      .subscribe((userDTO)=> {
          console.log(userDTO);
          this.router.navigateByUrl('/programme');
        },
        (error)=> {
          alert(error);
        });
  }


}
