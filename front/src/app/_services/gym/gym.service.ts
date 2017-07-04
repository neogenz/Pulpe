import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ObservableHelper} from "../../_helpers/ObservableHelper";
import {Observable} from "rxjs";
import {LocalStorageService} from "angular-2-local-storage";
import {Gym} from "../../_model/Gym";
import {environment} from '../../../environments/environment'
import { AuthHttp } from "angular2-jwt/angular2-jwt";

@Injectable()
export class GymService extends ObservableHelper {

  constructor(private http: AuthHttp, private localStorageService: LocalStorageService) {
    super();
  }

  public findAll(): Observable<Gym[] | string> {
    return this.http.get(`${environment.baseUrl()}/gyms`)
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