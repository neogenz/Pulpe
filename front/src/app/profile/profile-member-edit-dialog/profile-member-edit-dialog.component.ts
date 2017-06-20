import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {Member} from "../../_model/Member";
import {FormBuilder} from "@angular/forms";
import {MemberService} from "../../_services/member/member.service";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

@Component({
  selector: 'pulpe-profile-member-edit-dialog',
  templateUrl: 'profile-member-edit-dialog.component.html',
  styleUrls: ['profile-member-edit-dialog.component.css']
})
export class ProfileMemberEditDialogComponent extends DialogComponent<ProfileMemberEdit, Member> implements ProfileMemberEdit, OnInit {
  member: Member;

  constructor(dialogService: DialogService, private fb: FormBuilder,
              private memberService: MemberService, private slimLoadingBarService: SlimLoadingBarService) {
    super(dialogService);
  }

  ngOnInit() {
  }

}

export interface ProfileMemberEdit {
  member: Member;
}