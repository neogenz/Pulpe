import {Component, OnInit, Input} from '@angular/core';
import {AbstractExercise} from "../../../_model/exercise/AbstractExercise";
import {BodybuildingExercise} from '../../../_model/exercise/BodybuildingExercise';
import {CardioExercise} from "../../../_model/exercise/CardioExercise";
import {OrganizedExercise} from "../../../_model/exercise/OrganizedExercise";
import {StretchingExercise} from "../../../_model/exercise/StretchingExercise";

@Component({
    selector: 'pulpe-session-list',
    templateUrl: 'session-list.component.html',
    styleUrls: ['session-list.component.scss']
})
export class SessionListComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    @Input() exercise: AbstractExercise;
    @Input() exerciseGroupRawCode: string;

    public isMassGainer(exercise: AbstractExercise): boolean {
        return exercise instanceof BodybuildingExercise;
    }

    public isCardio(exercise: AbstractExercise): boolean {
        return exercise instanceof CardioExercise;
    }

    public isOrganized(exercise: AbstractExercise): boolean {
        return exercise instanceof OrganizedExercise;
    }

    public isStretching(exercise: AbstractExercise): boolean {
        return exercise instanceof StretchingExercise;
    }
}
