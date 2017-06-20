import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ObservableHelper} from "../../_helpers/ObservableHelper";
import {Observable} from "rxjs";
import {Member} from "../../_model/Member";
import {LocalStorageService} from "angular-2-local-storage";
import {Measurement} from "../../_model/Measurement";

@Injectable()
export class MemberService extends ObservableHelper {

  constructor(private http: Http, private localStorageService: LocalStorageService) {
    super();
  }

  public findById(id: string): Observable<Member | string> {
    let memberLocallyStored: string = this.localStorageService.get<string>('member');
    if (memberLocallyStored) {
      let rawMember = JSON.parse(memberLocallyStored);
      return Observable.of(new Member().initFromRawObject(rawMember));
    } else {
      return this.http.get(`http://localhost:5000/members/${id}`)
        .map(response => {
          const data: any = this.extractDataOf(response);
          debugger;
          return Member.of()
            .id(data.member._id)
            .lastName(data.member.lastName)
            .firstName(data.member.firstName)
            .measurements(data.member.measurements)
            .objective(data.member.objective)
            .sessionFrequency(data.member.sessionFrequency)
            .gym(data.member.gym)
            .mail(data.member.email)
            .createdAt(data.member.createdAt.toLocaleString())
            .birthDate(data.member.birthDate.toLocaleString())
            .build();
        }).catch(this.handleError);
    }
  }

  public addMeasurements(memberId: string, measurements: any): Observable<Member | string> {
    return this.http.put(`http://localhost:5000/members/${memberId}/measurements`, {
      measurements: measurements
    }).map(response => {
      const data: any = this.extractDataOf(response);
      return Member.of()
        .id(data.member._id)
        .lastName(data.member.lastName)
        .firstName(data.member.firstName)
        .measurements(data.member.measurements)
        .objective(data.member.objective)
        .sessionFrequency(data.member.sessionFrequency)
        .gym(data.member.gym)
        .mail(data.member.email)
        .createdAt(data.member.createdAt.toLocaleString())
        .birthDate(data.member.birthDate.toLocaleString())
        .build();
    }).catch(this.handleError);
  }

  public editProfile(member: Member): Observable<Member> {
    return this.http.put(`http://localhost:5000/members/${member.id}`, {
      member: member
    }).map(response => {
      const data: any = this.extractDataOf(response);
      return Member.of()
        .id(data.member._id)
        .lastName(data.member.lastName)
        .firstName(data.member.firstName)
        .measurements(data.member.measurements)
        .objective(data.member.objective)
        .sessionFrequency(data.member.sessionFrequency)
        .gym(data.member.gym)
        .mail(data.member.email)
        .createdAt(data.member.createdAt.toLocaleString())
        .birthDate(data.member.birthDate.toLocaleString())
        .build();
    }).catch(this.handleError);
  }
}