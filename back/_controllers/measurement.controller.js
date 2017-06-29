const MeasurementService = require('../_services/measurement.service');
const MemberService = require('../_services/member.service');
const MeasurementEnum = require('../_enums/MeasurementEnum');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const HTTP_CODE = require('../_helpers/HTTP_CODE.json');
const winston = require('winston');

class MeasurementController {
	constructor() {
	}

	/**
	 * Find evolution of one measurement for a member.
	 * @param req
	 * @param res
	 */
	static findEvolutionOfMeasurement(req, res) {
		const memberId = req.params.id;
		const measurementName = req.params.name;
		let measurement;
		let member;

		MemberService.findById(memberId)
			.then((memberFinded) => {
				member = memberFinded;
				return MeasurementService.findArchivedMeasurementsBy(memberFinded, measurementName.toUpperCase());
			}, (error) => {
				winston.log('error', error.stack);
				throw new error;
			})
			.then((measurements) => {
				measurement = MeasurementService.findMeasurementIn(member.measurements, MeasurementEnum[measurementName.toUpperCase()]);
				if (measurement) {
					measurements.push(measurement);
				}
				return MeasurementService.findEvolutionOf(measurements);
			}, (error) => {
				winston.log('error', error.stack);
				throw new error;
			})
			.then((evolution) => {
				res.send({evolution: evolution});
			}, (error) => {
				winston.log('error', error.stack);
				throw new error;
			})
			.catch((error) => {
				const httpError = HttpErrorHelper.buildHttpErrorByError(error);
				return res.status(httpError.code).send(httpError);
			});
	}
}

module.exports = MeasurementController;