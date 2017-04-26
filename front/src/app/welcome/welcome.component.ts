import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../_services/authentication/authentication.service";
import {Router} from '@angular/router';

@Component({
  selector: 'pulpe-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private authService:AuthenticationService, private router:Router) {
  }

  ngOnInit() {
    if (this.authService.authenticated()) {
      this.router.navigateByUrl('/accueil');
    }
  }

}
