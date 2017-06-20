import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthenticationService} from "../_services/authentication/authentication.service";
import {Router} from '@angular/router';
import {document} from "@angular/platform-browser/src/facade/browser";

@Component({
  selector: 'pulpe-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    if (this.authService.authenticated()) {
      this.router.navigateByUrl('/accueil');
    }
    document.body.className = "landing-page";
  }

  ngOnDestroy() {
    document.body.className = "";
  }
}
