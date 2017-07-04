import { Injectable } from '@angular/core';
import { MeasurementEnum } from "../_enums/MeasurementEnum";

@Injectable()
export class MeasurementEnumService {

  constructor() {
  }

  public getCodeFromName(enumValue:MeasurementEnum.Name):string {
    switch (enumValue) {
      case MeasurementEnum.Name.Hip:
        return 'HIP';
      case MeasurementEnum.Name.Waist:
        return 'WAIST';
      case MeasurementEnum.Name.Chest:
        return 'CHEST';
      case MeasurementEnum.Name.Shoulders:
        return 'SHOULDERS';
      case MeasurementEnum.Name.Right_Arm:
        return 'RIGHT_ARM';
      case MeasurementEnum.Name.Left_Arm:
        return 'LEFT_ARM';
      case MeasurementEnum.Name.Right_Calf:
        return 'RIGHT_CALF';
      case MeasurementEnum.Name.Left_Calf:
        return 'LEFT_CALF';
      case MeasurementEnum.Name.Right_Thigh:
        return 'RIGHT_THIGH';
      case MeasurementEnum.Name.Left_Thigh:
        return 'LEFT_THIGH';
      case MeasurementEnum.Name.Size:
        return 'SIZE';
      case MeasurementEnum.Name.Weight:
        return 'WEIGHT';
    }
  }

  public getCodeFromUnit(enumValue:MeasurementEnum.Unit):string{
    switch(enumValue){
      case MeasurementEnum.Unit.Centimeter:
        return 'CM';
      case MeasurementEnum.Unit.Meter:
        return 'M';
      case MeasurementEnum.Unit.Kilogram:
        return 'KG';
    }
  }
}
