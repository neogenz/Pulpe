import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ObservableHelper} from "../../_helpers/ObservableHelper";
import {Observable} from "rxjs";
import {LocalStorageService} from "angular-2-local-storage";
import {Gym} from "../../_model/Gym";

@Injectable()
export class GymService extends ObservableHelper {

  constructor(private http: Http, private localStorageService: LocalStorageService) {
    super();
  }

  public findAll(): Observable<Gym[] | string> {
    return this.http.get(`http://localhost:5000/gyms`)
      .map(response => {
        const data: any = this.extractDataOf(response);
        const gyms = [];
        data.gyms.forEach(gym => {
          gyms.push(
            Gym.of()
              .id(gym._id)
              .name(gym.name)
              .address(gym.address)
              .city(gym.city)
              .build()
          );
        });
        return gyms;
      }).catch(this.handleError);
  }
}