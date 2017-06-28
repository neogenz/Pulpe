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

MeasurementEnum.HIP = new MeasurementEnum('HIP');
MeasurementEnum.WAIST = new MeasurementEnum('WAIST');
MeasurementEnum.CHEST = new MeasurementEnum('CHEST');
MeasurementEnum.SHOULDERS = new MeasurementEnum('SHOULDERS');
MeasurementEnum.BASIN = new MeasurementEnum('BASIN');
MeasurementEnum.RIGHT_ARM = new MeasurementEnum('RIGHT_ARM');
MeasurementEnum.LEFT_ARM = new MeasurementEnum('LEFT_ARM');
MeasurementEnum.RIGHT_CALF = new MeasurementEnum('RIGHT_CALF');
MeasurementEnum.LEFT_CALF = new MeasurementEnum('LEFT_CALF');
MeasurementEnum.LEFT_THIGH = new MeasurementEnum('LEFT_THIGH');
MeasurementEnum.RIGHT_THIGH = new MeasurementEnum('RIGHT_THIGH');
MeasurementEnum.WEIGHT = new MeasurementEnum('WEIGHT');
MeasurementEnum.SIZE = new MeasurementEnum('SIZE');
MeasurementEnum.IMC = new MeasurementEnum('IMC');

module.exports = MeasurementEnum;