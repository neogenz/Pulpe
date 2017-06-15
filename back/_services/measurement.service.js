const MemberService = require('./member.service');
const Measurement = require('../_model/Measurement');
const ArchivedMeasurement = require('../_model/ArchivedMeasurement');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../_model/Errors').NotFoundError;

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
            archivedMeasurement = new ArchivedMeasurement();
            archivedMeasurement.member_id = memberId;
            archivedMeasurement.name = mes.name;
            archivedMeasurement.unit = mes.unit;
            archivedMeasurement.value = mes.value;
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
}
module.exports = MeasurementService;


