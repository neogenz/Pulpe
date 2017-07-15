import {MeasurementEnum} from "../_enums/MeasurementEnum";
import {MeasurementEnumService} from "../_services/measurement-enum.service";

export class Measurement {
  constructor() {

  }

  public name: MeasurementEnum.Name;
  public unit: MeasurementEnum.Unit;
  public value: number;

  public static of(): MeasurementBuilder {
    return new MeasurementBuilder();
  }

  serialize(): ServerMeasurement {
    const measurementEnumService: MeasurementEnumService = new MeasurementEnumService();
    const serverMeasurement = new ServerMeasurement();
    serverMeasurement.unit = measurementEnumService.getCodeFromUnit(this.unit);
    serverMeasurement.name = MeasurementEnum.Name[this.name];
    serverMeasurement.value = this.value;
    return serverMeasurement;
  }
}

class ServerMeasurement {
  name: string;
  unit: string;
  value: number;

  constructor() {

  }
}

class MeasurementBuilder {
  public me: Measurement;

  constructor() {
    this.me = new Measurement();
  }

  public name(name: MeasurementEnum.Name): MeasurementBuilder {
    this.me.name = name;
    return this;
  }

  public unit(unit: MeasurementEnum.Unit): MeasurementBuilder {
    this.me.unit = unit;
    return this;
  }

  public value(value: number): MeasurementBuilder {
    this.me.value = value;
    return this;
  }

  public build(): Measurement {
    return this.me;
  }
}


