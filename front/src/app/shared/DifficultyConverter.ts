import {DifficultyEnum} from "../_enums/DifficultyEnum";
/**
 * Class used to convert raw difficulty to label in local langage
 */
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
}
