import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ObservableHelper} from "../../_helpers/ObservableHelper";
import {Observable} from "rxjs";
import {Coach} from "../../_model/Coach";
import {LocalStorageService} from "angular-2-local-storage";

@Injectable()
export class CoachService extends ObservableHelper {

  constructor(private http: Http, private localStorageService: LocalStorageService) {
    super();
  }

  public findById(id: string): Observable<Coach | string> {
    let coachLocallyStored: string = this.localStorageService.get<string>('coach');
    if (coachLocallyStored) {
      let rawMember = JSON.parse(coachLocallyStored);
      return Observable.of(new Coach().initFromRawObject(rawMember));
    } else {
      return this.http.get(`http://localhost:5000/coachs/${id}`)
        .map(response => {
          const data: any = this.extractDataOf(response);
          return Coach.of()
            .id(data.member._id)
            .lastName(data.coach.lastName)
            .firstName(data.coach.firstName)
            .city(data.coach.city)
            .address(data.coach.address)
            .dateOfBirth(data.coach.dateOfBirth)
            .gym(data.coach.gym)
            .profileCompleted(data.coach.profileIsCompleted)
            .build();
        }).catch(this.handleError);
    }
  }
}