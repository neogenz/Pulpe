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
    const memberId = req.user._id;
    const measurementName = req.params.name;
    let measurement;
    let member;

    return MemberService.findById(memberId)
      .then((memberFinded) => {
        member = memberFinded;
        return MeasurementService.findArchivedMeasurementsBy(memberFinded, measurementName);
      }, (error) => {
        throw error;
      })
      .then((measurements) => {
        measurement = MeasurementService.findMeasurementIn(member.measurements, MeasurementEnum[measurementName]);
        if (measurement) {
          measurements.push(measurement);
        }
        return MeasurementService.findEvolutionOf(measurements);
      }, (error) => {
        throw error;
      })
      .then((evolution) => {
        res.send({evolution: evolution});
      }, (error) => {
        throw error;
      })
      .catch((error) => {
        winston.log('error', error.stack);
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }
}

module.exports = MeasurementController;