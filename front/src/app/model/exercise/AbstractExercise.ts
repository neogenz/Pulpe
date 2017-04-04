export abstract class AbstractExercise {

  id:number;
  name:string;
  mahcines:any[];

  constructor(id:number, name:string) {
    this.id = id;
    this.name = name;
    this.mahcines = null;
  }

  abstract initFromRawObject(rawObject:any):AbstractExercise;
}
