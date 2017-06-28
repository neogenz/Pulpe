const Measurement = require('../_model/Measurement');
const ArchivedMeasurement = require('../_model/ArchivedMeasurement');
const MeasurementEnum = require('../_enums/MeasurementEnum');
const CorpulenceEnum = require('../_enums/CorpulenceEnum');
const ObjectiveEnum = require('../_enums/ObjectiveEnum');

class MeasurementService {
	constructor() {
	}

	/**
	 * save of archived measurements
	 * @param memberId member
	 * @param measurements
	 * @returns {Promise.<ArchivedMeasurement>|Promise}
	 */
	static createArchivedMeasurements(memberId, measurements) {
		let measurementsPromises = [];
		let archivedMeasurement;
		measurements.forEach(mes => {
			if (MeasurementEnum[mes.name] !== MeasurementEnum.IMC) {
				archivedMeasurement = new ArchivedMeasurement();
				archivedMeasurement.member_id = memberId;
				archivedMeasurement.name = mes.name;
				archivedMeasurement.unit = mes.unit;
				archivedMeasurement.value = mes.value;
			}
			measurementsPromises.push(archivedMeasurement.save());
		});
		return Promise.all(measurementsPromises)
			.then(archivedMeasurements => {
				return archivedMeasurements;
			})
			.catch(error => {
				throw error;
			});
	}

	/**
	 * Find all archived measurements of a member.
	 * @returns {Promise.<ArchivedMeasurement>|Promise}
	 */
	static findAllArchivedMeasurementsBy(member) {
		return ArchivedMeasurement.find({'member_id': member._id})
			.then(
				archivedMeasurements => {
					return archivedMeasurements;
				})
			.catch(
				error => {
					throw error;
				}
			);

	}

	/**
	 * Find a measurement in array measurements which correspond to the measurement name.
	 * @param measurements
	 * @param measurementToFind
	 * @returns {*}
	 */
	static findMeasurementIn(measurements, measurementToFind) {
		let measurement;
		measurements.forEach((m) => {
			if (MeasurementEnum[m.name] === measurementToFind) {
				measurement = m;
			}
		});
		return measurement;
	}


	/**
	 * Return IMC of a member.
	 * @param weightMeasurement
	 * @param sizeMeasurement
	 * @returns {number}
	 */
	static getIMCBy(weightMeasurement, sizeMeasurement) {
		if (!weightMeasurement || !sizeMeasurement) {
			throw new Error(`IMC Can't be generate`);
		}
		let weight = weightMeasurement.value;
		let size = sizeMeasurement.value;

		return (weight / (size * size)) * 10000;
	}

	/**
	 * Return ideal IMC of a member by his initial IMC and his objective.
	 * @param imc
	 * @param objective
	 * @returns {*}
	 */
	static getIdealIMCBy(imc, objective) {
		const corpulence = CorpulenceEnum.getCorpulenceBy(imc);
		switch (objective) {
			case ObjectiveEnum.MassGainer:
				return determineIdealIMCForMassGainer(corpulence);
			case ObjectiveEnum.GeneralForm:
				return determineIdealIMCForGeneralForm(corpulence);
			case ObjectiveEnum.WeightLoss:
				return determineIdealIMCForWeightLoss(corpulence);
		}
	}

}
module.exports = MeasurementService;


function determineIdealIMCForMassGainer(corpulence) {
	switch (corpulence) {
		case CorpulenceEnum.Maigreur:
			return 21.5;
		case CorpulenceEnum.Normal:
			return 27;
	}
}

function determineIdealIMCForWeightLoss(corpulence) {
	switch (corpulence) {
		case CorpulenceEnum.Maigreur:
			return 21.5;
		case CorpulenceEnum.Normal:
			return 27;
	}
}

function determineIdealIMCForGeneralForm(corpulence) {
	switch (corpulence) {
		case CorpulenceEnum.Maigreur:
			return 21.5;
		case CorpulenceEnum.Normal:
			return 27;
	}
}

