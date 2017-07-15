import { Injectable } from '@angular/core';
import { MeasurementEnum } from "../_enums/MeasurementEnum";

@Injectable()
export class MeasurementEnumService {

  constructor() {
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
