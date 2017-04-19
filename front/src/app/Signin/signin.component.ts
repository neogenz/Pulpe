import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {AuthenticateDTO} from "../authentication.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'pulpe-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService) { }

  public authenticate:Observable<AuthenticateDTO> = new Observable();

  ngOnInit() {
  }

  public signin():void{
    this.authenticate = this.authenticationService.authenticate('max', 'test');
  }

}
