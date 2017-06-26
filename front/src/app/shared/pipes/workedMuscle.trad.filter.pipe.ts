import {Pipe, PipeTransform} from '@angular/core';
import {WorkedMuscle} from "../../_model/WorkedMuscle";
import {MuscleEnum} from "../../_enums/MuscleEnum";
import {MuscleConverter} from "../../shared/MuscleConverter";

@Pipe({
	name: 'translateWorkedMuscleName',
	pure: false
})
export class TranslateWorkedMuscleName implements PipeTransform {
	constructor(private muscleConverter: MuscleConverter) {
	}

	transform(workedMuscle: WorkedMuscle, value: string): string {
		if (!workedMuscle) {
			return;
		}
		return this.muscleConverter.getLabelFromEnum(workedMuscle.name);
	}
}