import {Component, OnInit, Input} from '@angular/core';
import {MemberService} from "../../_services/member/member.service";
import {Observable} from "rxjs";
import {Member} from "../../_model/Member";
import {Router} from "@angular/router";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {LocalStorageService} from "angular-2-local-storage";
import {AuthenticationProfile} from "../../_model/AuthenticationProfile";

@Component({
    selector: 'pulpe-profile-infos',
    templateUrl: 'profile-infos.component.html',
    styleUrls: ['profile-infos.component.css']
})
export class ProfileInfosComponent implements OnInit {
    @Input() member:Member;

    constructor() {
    }

    ngOnInit() {
        console.dir(this.member);
    }

}
