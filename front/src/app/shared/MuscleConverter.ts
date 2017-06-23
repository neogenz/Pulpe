import {Injectable} from "@angular/core";
import {MuscleEnum} from "../_enums/MuscleEnum";

/**
 * Class used to convert raw muscles group code to label
 */
@Injectable()
export class MuscleConverter {

	private muscleLabelConverter = new Map<string, string>();

	constructor() {
		this.muscleLabelConverter.set(MuscleEnum.Name[MuscleEnum.Name.Biceps], 'Bicepts');
		this.muscleLabelConverter.set(MuscleEnum.Name[MuscleEnum.Name.Cardio], 'Cardio');
		this.muscleLabelConverter.set(MuscleEnum.Name[MuscleEnum.Name.Lumbar], 'Lombaire');
		this.muscleLabelConverter.set(MuscleEnum.Name[MuscleEnum.Name.Deltoid], 'Deltoide');
		this.muscleLabelConverter.set(MuscleEnum.Name[MuscleEnum.Name.GastrocnemiusLateral], 'Mollet');
		this.muscleLabelConverter.set(MuscleEnum.Name[MuscleEnum.Name.GluteusMaximus], 'Grand fessier');
		this.muscleLabelConverter.set(MuscleEnum.Name[MuscleEnum.Name.GluteusMedius], 'Moyen fessier');
		this.muscleLabelConverter.set(MuscleEnum.Name[MuscleEnum.Name.LatissimusDorsi], 'Grand dorsal');
		this.muscleLabelConverter.set(MuscleEnum.Name[MuscleEnum.Name.LowerBack], 'Bas du dos');
		this.muscleLabelConverter.set(MuscleEnum.Name[MuscleEnum.Name.MiddleBack], 'Dos central');
		this.muscleLabelConverter.set(MuscleEnum.Name[MuscleEnum.Name.Pecs], 'Pectoraux');
		this.muscleLabelConverter.set(MuscleEnum.Name[MuscleEnum.Name.PosteriorDeltoid], 'Deltoide postérieur');
		this.muscleLabelConverter.set(MuscleEnum.Name[MuscleEnum.Name.RectusAbdominus], 'Abdos');
		this.muscleLabelConverter.set(MuscleEnum.Name[MuscleEnum.Name.ThighBiceps], 'Arrière de la cuisse');
		this.muscleLabelConverter.set(MuscleEnum.Name[MuscleEnum.Name.ThighQuadriceps], 'Avant de la cuisse');
		this.muscleLabelConverter.set(MuscleEnum.Name[MuscleEnum.Name.Triceps], 'Tricepts');
		this.muscleLabelConverter.set(MuscleEnum.Name[MuscleEnum.Name.Traps], 'Trapèze');
	}

	public getFrom(name: string): string {
		if (this.muscleLabelConverter.has(name)) {
			return this.muscleLabelConverter.get(name);
		}
		return '';
	}

	public toLabelArray(): string[] {
		return Array.from(this.muscleLabelConverter.values());
	}

	public getEnumFromName(name: string): MuscleEnum.Name {
		let enumInstance: MuscleEnum.Name = MuscleEnum.Name[name];
		return enumInstance;
	}

	public getNameFrom(labelToFind: string): MuscleEnum.Name {
		let nameLabelArray: Array<Array<string>> = Array.from(this.muscleLabelConverter.entries());
		let name: string;
		let label: string;
		for (let i = 0; i < nameLabelArray.length; i++) {
			name = nameLabelArray[i][0];
			label = nameLabelArray[i][1];
			if (label === labelToFind) {
				return MuscleEnum.Name[name];
			}
		}
		throw new Error(`This label => ${labelToFind} not find on MuscleEnum.Name`);
	}

	public getLabelFromEnum(enumValue: MuscleEnum.Name): string {
		return this.muscleLabelConverter.get(MuscleEnum.Name[enumValue]);
	}

	public getEnumFromValue(value: number): MuscleEnum.Name {
		return MuscleEnum.Name[MuscleEnum.Name[value]];
	}

}
