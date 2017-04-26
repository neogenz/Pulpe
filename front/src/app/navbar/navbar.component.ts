import { Component } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import {AuthenticationService} from "../_services/authentication/authentication.service";
import { Router } from '@angular/router';
import {ProfileService} from "../profile/profile.service";

@Component({
    selector: 'pulpe-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public profileIsCompleted:boolean = false;

    constructor(public auth:AuthenticationService, private router:Router, private profileService:ProfileService) {
        this.profileIsCompleted = this.profileService.profileIsCompleted();
    }

    public signout():void{
        this.auth.signout();
        this.router.navigateByUrl('');
    }
}
