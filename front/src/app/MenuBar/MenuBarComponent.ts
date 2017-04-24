import { Component } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import {AuthenticationService} from "../_services/authentication/authentication.service";
import { Router } from '@angular/router';

@Component({
  selector: 'pulpe-menu-bar-cmp',
  templateUrl: './MenuBarView.html',
  styleUrls: ['./menuBar.component.css']
})
export class MenuBarComponent {
  constructor(public auth:AuthenticationService, private router:Router) {
  }

  public signout():void{
    this.auth.signout();
    this.router.navigateByUrl('');
  }
}
