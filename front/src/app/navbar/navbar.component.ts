import {Component, OnInit} from '@angular/core';
import {RouterLinkActive} from '@angular/router';
import {AuthenticationService} from "../_services/authentication/authentication.service";
import {Router} from '@angular/router';

@Component({
    selector: 'pulpe-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(public auth: AuthenticationService, private router: Router) {
    }

    ngOnInit() {

    }

    public signout(): void {
        this.auth.signout();
        this.router.navigateByUrl('');
    }

}
