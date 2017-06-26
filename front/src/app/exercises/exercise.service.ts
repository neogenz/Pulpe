import {Injectable} from '@angular/core';
import {AuthHttp} from "angular2-jwt";
import {environment} from "../../environments/environment";
import {ObservableHelper} from "../_helpers/ObservableHelper";
import {ExerciseGroupCodeConverter} from "../shared/ExerciseGroupCodeConverter";
import {Observable} from "rxjs/Observable";
import {ExercisesGroup} from "../_model/exercise/ExercisesGroup";

@Injectable()
export class ExerciseService extends ObservableHelper {

  constructor(private _http: AuthHttp) {
    super();
  }

  public findAllByGymOfAuthenticatedCoach(): Observable<ExercisesGroup[]> {
    return this._http.get(`${environment.baseUrl()}/exercises`)
      .map(res => {
        let data: any = this.extractDataOf(res);
        return ExerciseGroupCodeConverter.createExercisesGroupsFrom(data);
      })
      .catch(this.handleError);
  }

}
