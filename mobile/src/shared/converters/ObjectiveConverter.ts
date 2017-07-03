import { ObjectiveEnum } from "../../enums/ObjectiveEnum";
import { Injectable } from "@angular/core";
/**
 * Created by maximedesogus on 28/06/2017.
 */

@Injectable()
export class ObjectiveConveter {

  private objectiveConveter = new Map<string, string>();

  constructor() {
    this.objectiveConveter.set('WeightLoss', 'Perte de poids');
    this.objectiveConveter.set('MassGainer', 'Prise de masse');
    this.objectiveConveter.set('GeneralForm', 'Forme générale');
  }

  public getLabelFrom(objective: string): string {
    return this.objectiveConveter.get(objective);
  }

  public convertThisEnum(objective: ObjectiveEnum): string {
    return this.objectiveConveter.get(ObjectiveEnum[objective]);
  }

  public getEnumFromName(name: string): ObjectiveEnum {
    return ObjectiveEnum[name];
  }

  public getEnumFromLabel(labelToFind: string): ObjectiveEnum {
    let nameLabelArray: Array<Array<string>> = Array.from(this.objectiveConveter.entries());
    let name: string;
    let label: string;
    for (let i = 0; i < nameLabelArray.length; i++) {
      name = nameLabelArray[i][0];
      label = nameLabelArray[i][1];
      if (label === labelToFind) {
        return ObjectiveEnum[name];
      }
    }
    throw new Error(`This label => ${labelToFind} not find on ObjectiveEnum`);
  }

  public getLabelsArray(): string[] {
    return Array.from(this.objectiveConveter.values());
  }
}