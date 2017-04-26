import { Injectable } from '@angular/core';
import {AuthenticationService} from "../_services/authentication/authentication.service";
import {AuthenticationProfile} from "../_model/AuthenticationProfile";
import {Measurement} from "../_model/Measurement";
import {Member} from "../_model/Member";
import {Observable} from "rxjs/Observable";
import {MeasurementEnumService} from "../_services/measurement-enum.service";
//import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {ObservableHelper} from "../_helpers/ObservableHelper";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as moment from "moment/moment";

@Injectable()
export class ProfileService extends ObservableHelper {

  constructor(private authService:AuthenticationService, private measurementEnumService:MeasurementEnumService, private http:Http) {
    super();
  }

  public profileIsCompleted():boolean {
    const profile:AuthenticationProfile = this.authService.getAuthenticationProfileInLocalStorage();
    if (profile && profile.profileCompleted) {
      return true;
    }
    return false;
  }

  public completeProfile(size:Measurement, weight:Measurement, frequency:number, birthdate:Date, objective:string):Observable<AuthenticationProfile|string> {
    const profile:AuthenticationProfile = this.authService.getAuthenticationProfileInLocalStorage();
    const url = `http://localhost:5000/members/${profile.id}/profile/completed`;
    const body = {
      measurements: [
        {
          name: this.measurementEnumService.getCodeFromName(size.name),
          unit: this.measurementEnumService.getCodeFromUnit(size.unit),
          value: size.value
        },
        {
          name: this.measurementEnumService.getCodeFromName(weight.name),
          unit: this.measurementEnumService.getCodeFromUnit(weight.unit),
          value: weight.value
        }
      ],
      sessionFrequency: frequency,
      birthDate: moment(birthdate).format('YYYY-MM-DD'),
      objective: objective
    };
    return this.http.post(url, body).map(response => {
        const data:any = this.extractDataOf(response);
        //const rawProfile = this.jwtHelper.decodeToken(data.token);
        const profile:AuthenticationProfile = this.authService.getAuthenticationProfileInLocalStorage();
        profile.profileCompleted = true;
        return profile;
      })
      .catch(this.handleError);
  }

}
