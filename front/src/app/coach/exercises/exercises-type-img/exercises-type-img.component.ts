import {Component, Input, OnInit} from '@angular/core';
import {ExerciseGroupTypeEnum} from "../../../_enums/ExerciseGroupTypeEnum";
import {ExerciseGroupTypeFiltrable} from "../../../shared/ExerciseGroupTypeFiltrable";

@Component({
  selector: 'pulpe-exercises-type-img',
  templateUrl: './exercises-type-img.component.html',
  styleUrls: ['./exercises-type-img.component.scss']
})
export class ExercisesTypeImgComponent extends ExerciseGroupTypeFiltrable implements OnInit {

  @Input()
  exerciseTypeEnum: ExerciseGroupTypeEnum;
  @Input()
  width: string;
  ExerciseGroupTypeEnum: any = ExerciseGroupTypeEnum;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
