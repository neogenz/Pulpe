import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Member} from "../_model/Member";
import {Animations} from "../shared/Animations";

@Component({
    selector: 'pulpe-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    animations: [Animations.fadeIn()]
})
export class ProfileComponent implements OnInit {
    private member: Member;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.member = this.route.snapshot.data['profile'];
    }

}
