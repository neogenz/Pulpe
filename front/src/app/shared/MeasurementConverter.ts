import {Injectable} from "@angular/core";
import {MeasurementEnum} from "../_enums/MeasurementEnum";

/**
 * Class used to convert raw measurement to label
 */
@Injectable()
export class MeasurementConverter {

	private measurementLabelConverter = new Map<string, string>();

	constructor() {
		this.measurementLabelConverter.set(MeasurementEnum.Name[MeasurementEnum.Name.Size], 'Taille');
		this.measurementLabelConverter.set(MeasurementEnum.Name[MeasurementEnum.Name.Hip], 'Tour de hanche');
		this.measurementLabelConverter.set(MeasurementEnum.Name[MeasurementEnum.Name.Shoulders], 'Epaules');
		this.measurementLabelConverter.set(MeasurementEnum.Name[MeasurementEnum.Name.Chest], 'Tour de poitrine');
		this.measurementLabelConverter.set(MeasurementEnum.Name[MeasurementEnum.Name.LeftArm], 'Bras gauche');
		this.measurementLabelConverter.set(MeasurementEnum.Name[MeasurementEnum.Name.RightArm], 'Bras droit');
		this.measurementLabelConverter.set(MeasurementEnum.Name[MeasurementEnum.Name.LeftCalf], 'Mollet gauche');
		this.measurementLabelConverter.set(MeasurementEnum.Name[MeasurementEnum.Name.RightCalf], 'Mollet droite');
		this.measurementLabelConverter.set(MeasurementEnum.Name[MeasurementEnum.Name.RightThigh], 'Cuisse droite');
		this.measurementLabelConverter.set(MeasurementEnum.Name[MeasurementEnum.Name.LeftThigh], 'Cuisse gauche');
		this.measurementLabelConverter.set(MeasurementEnum.Name[MeasurementEnum.Name.Waist], 'Tour de taille');
		this.measurementLabelConverter.set(MeasurementEnum.Name[MeasurementEnum.Name.Weight], 'Poids');
	}

	public toLabelArray(): string[] {
		return Array.from(this.measurementLabelConverter.values());
	}

	public getEnumFrom(labelToFind: string): MeasurementEnum.Name {
		let nameLabelArray: Array<Array<string>> = Array.from(this.measurementLabelConverter.entries());
		let name: string;
		let label: string;
		for (let i = 0; i < nameLabelArray.length; i++) {
			name = nameLabelArray[i][0];
			label = nameLabelArray[i][1];
			if (label === labelToFind) {
				return MeasurementEnum.Name[name];
			}
		}
	}

	public getNameFrom(labelToFind: string): string {
		let measurementEnum: MeasurementEnum.Name;
		measurementEnum = this.getEnumFrom(labelToFind);
		return MeasurementEnum.Name[measurementEnum];
	}
}