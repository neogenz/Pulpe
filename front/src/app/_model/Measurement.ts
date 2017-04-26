import { MeasurementEnum } from "../_enums/MeasurementEnum";

export class Measurement {
  constructor() {

  }

  public name:MeasurementEnum.Name;
  public unit:MeasurementEnum.Unit;
  public value:number;

  public static of():MeasurementBuilder {
    return new MeasurementBuilder();
  }
}

class MeasurementBuilder {
  public me:Measurement;

  constructor() {
    this.me = new Measurement();
  }

  public name(name:MeasurementEnum.Name):MeasurementBuilder {
    this.me.name = name;
    return this;
  }

  public unit(unit:MeasurementEnum.Unit):MeasurementBuilder {
    this.me.unit = unit;
    return this;
  }

  public value(value:number):MeasurementBuilder {
    this.me.value = value;
    return this;
  }

  public build():Measurement {
    return this.me;
  }
}


