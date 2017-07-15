class MeasurementEnum {

	constructor(name) {
		this.name = name;
	}

	toString() {
		return `${this.name}`;
	}

	static getName(name) {
		return MeasurementEnum[name].name;
	}
}

MeasurementEnum.Hip = new MeasurementEnum('Hip');
MeasurementEnum.Waist = new MeasurementEnum('Waist');
MeasurementEnum.Chest = new MeasurementEnum('Chest');
MeasurementEnum.Shoulders = new MeasurementEnum('Shoulders');
MeasurementEnum.Basin = new MeasurementEnum('Basin');
MeasurementEnum.RightArm = new MeasurementEnum('RightArm');
MeasurementEnum.LeftArm = new MeasurementEnum('LeftArm');
MeasurementEnum.RightCalf = new MeasurementEnum('RightCalf');
MeasurementEnum.LeftCalf = new MeasurementEnum('LeftCalf');
MeasurementEnum.LeftThigh = new MeasurementEnum('LeftThigh');
MeasurementEnum.RightThigh = new MeasurementEnum('RightThigh');
MeasurementEnum.Weight = new MeasurementEnum('Weight');
MeasurementEnum.Size = new MeasurementEnum('Size');
MeasurementEnum.Imc = new MeasurementEnum('Imc');

module.exports = MeasurementEnum;