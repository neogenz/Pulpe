import { DifficultyEnum } from "../../enums/DifficultyEnum";
import { Injectable } from "@angular/core";
/**
 * Class used to convert raw difficulty to label in local langage
 */
@Injectable()
export class DifficultyConverter {

  private difficultyConverter = new Map<string, string>();

  constructor() {
    this.difficultyConverter.set('easy', 'facile');
    this.difficultyConverter.set('medium', 'moyen');
    this.difficultyConverter.set('hard', 'difficile');
  }

  public convertThis(difficulty: string): string {
    return this.difficultyConverter.get(difficulty);
  }

  public convertThisEnum(difficulty: DifficultyEnum): string {
    return this.difficultyConverter.get(DifficultyEnum[difficulty]);
  }

  public getEnumFromName(name: string): DifficultyEnum {
    return DifficultyEnum[name];
  }

  public getEnumFromLabel(labelToFind: string): DifficultyEnum {
    let nameLabelArray: Array<Array<string>> = Array.from(this.difficultyConverter.entries());
    let name: string;
    let label: string;
    for (let i = 0; i < nameLabelArray.length; i++) {
      name = nameLabelArray[i][0];
      label = nameLabelArray[i][1];
      if (label === labelToFind) {
        return DifficultyEnum[name];
      }
    }
    throw new Error(`This label => ${labelToFind} not find on DifficultyEnum`);
  }

  public getLabelsArray(): string[] {
    return Array.from(this.difficultyConverter.values());
  }

}
