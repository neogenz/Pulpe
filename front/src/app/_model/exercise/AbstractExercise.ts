export abstract class AbstractExercise {

  id:number;
  name:string;
  machines:any[];
  approximateTime:number;

  constructor(id:number, name:string, machines:any[]) {
    this.id = id;
    this.name = name;
    this.machines = machines;
  }

  abstract initFromRawObject(rawObject:any):AbstractExercise;

  abstract calculApproximateTime():number;
}
