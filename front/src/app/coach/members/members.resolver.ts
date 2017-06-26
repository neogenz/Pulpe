import {Observable} from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Member} from "../../_model/Member";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {MemberService} from "../../_services/member/member.service";

@Injectable()
export class MembersResolver implements Resolve<any> {
  constructor(private memberService: MemberService, private slimLoadingBarService: SlimLoadingBarService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Member[]> | Promise<Member[]> | Member[] {
    return this.memberService.findAllByCoach(route.params['idCoach']);
  }
}
