import {Injectable} from '@angular/core';
import {MeasurementEnum} from "../_enums/MeasurementEnum";
import {ObjectiveEnum} from "../_enums/ObjectiveEnum";

@Injectable()
export class ObjectiveEnumService {

  constructor() {
  }

  public getObjectiveFromName(value: string): ObjectiveEnum {
    switch (value) {
      case 'MassGainer':
        return ObjectiveEnum.MassGainer;
      case 'GeneralForm':
        return ObjectiveEnum.GeneralForm;
      case 'WeightLoss':
        return ObjectiveEnum.WeightLoss;
    }
  }

  public getNameFromEnum(value: ObjectiveEnum): string {
    switch (value) {
      case ObjectiveEnum.MassGainer:
        return 'MassGainer';
      case ObjectiveEnum.GeneralForm:
        return 'GeneralForm';
      case ObjectiveEnum.WeightLoss:
        return 'WeightLoss';
    }
  }
}
