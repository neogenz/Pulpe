/**
 * Created by maximedesogus on 24/06/2017.
 */
import {Observable} from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ExerciseService} from "./exercise.service";
import {ExercisesGroup} from "../_model/exercise/ExercisesGroup";

@Injectable()
export class ExerciseResolver implements Resolve<any> {
  constructor(private exerciseService: ExerciseService, private slimLoadingBarService: SlimLoadingBarService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ExercisesGroup[]> | Promise<ExercisesGroup[]> | ExercisesGroup[] {
    this.slimLoadingBarService.start();
    return this.exerciseService.findAllByGymOfAuthenticatedCoach().flatMap((exercisesGroups) => {
      this.slimLoadingBarService.complete();
      return Observable.of(exercisesGroups);
    });
  }
}
