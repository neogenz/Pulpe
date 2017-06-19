import {Observable} from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Member} from "../_model/Member";
import {MemberService} from "../_services/member/member.service";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

@Injectable()
export class ProfileResolver implements Resolve<any> {
  constructor(private memberService: MemberService, private slimLoadingBarService: SlimLoadingBarService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Member> | Promise<Member> | Member {
    return this.memberService.findById(route.params['id']);
  }
}
