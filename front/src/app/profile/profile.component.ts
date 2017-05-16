import {Component, OnInit} from '@angular/core';
import {MemberService} from "../_services/member/member.service";
import {Observable} from "rxjs";
import {LocalStorageService} from "angular-2-local-storage";
import {Router, ActivatedRoute} from "@angular/router";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {AuthenticationProfile} from "../_model/AuthenticationProfile";
import {Member} from "../_model/Member";
import {ProfileResolver} from "./profile.resolver";

@Component({
    selector: 'pulpe-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    private member: Member;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.member = this.route.snapshot.data['profile'];
    }

}
