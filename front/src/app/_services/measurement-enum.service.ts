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

  public getUnitEnumFrom(code:String):MeasurementEnum.Unit{
    switch(code){
      case 'CM':
        return MeasurementEnum.Unit.Centimeter;
      case 'M':
        return MeasurementEnum.Unit.Meter;
      case 'KG':
        return MeasurementEnum.Unit.Kilogram;
    }
  }
}
