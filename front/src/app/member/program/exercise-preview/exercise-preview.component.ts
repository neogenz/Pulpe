import {
  Component, OnInit, Input, AfterContentInit, Output, EventEmitter, OnChanges,
  SimpleChanges
} from '@angular/core';
import {AbstractExercise} from "../../../_model/exercise/AbstractExercise";
import {ExerciseGroupTypeFiltrable} from "../../../shared/ExerciseGroupTypeFiltrable";
import {DifficultyConverter} from "../../../shared/DifficultyConverter";
import {ExerciseGroupTypeEnum} from "../../../_enums/ExerciseGroupTypeEnum";
import {DialogService} from "ng2-bootstrap-modal";
import {
  ExerciseFormConfigurable,
  ExerciseSpecificPropertiesFormDialogComponent
} from "../../exercise/exercise-specific-properties-form-dialog/exercise-specific-properties-form-dialog.component";

@Component({
  selector: 'pulpe-exercise-preview',
  templateUrl: './exercise-preview.component.html',
  styleUrls: ['./exercise-preview.component.scss']
})
export class ExercisePreviewComponent implements OnInit, OnChanges {

  @Output() exerciseUpdated: EventEmitter<AbstractExercise> = new EventEmitter<AbstractExercise>();
  @Input() exercise: AbstractExercise;
  public difficultyConverter: DifficultyConverter;
  public ExerciseGroupTypeEnum: any = ExerciseGroupTypeEnum;
  private exerciseFormConfiguration: ExerciseFormConfigurable;

  constructor(private dialogService: DialogService) {
    this.difficultyConverter = new DifficultyConverter();
  }

  ngOnInit() {

  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  openDialogToEditThis(exercise: AbstractExercise) {
    this.exerciseFormConfiguration = {
      title: 'Modifier votre exercice',
      exercise: exercise
    };
    this.dialogService.addDialog(ExerciseSpecificPropertiesFormDialogComponent, this.exerciseFormConfiguration, {
      backdropColor: 'rgba(0,0,0,0.5)'
    }).subscribe((updated) => {
      this.exercise = updated;
      this.exerciseUpdated.emit(updated);
    });
  }

}
