'use strict';

const MeasurementController = require('../_controllers/measurement.controller');

class MeasurementRouter {
  constructor(provider) {
  }
}

module.exports = (provider)=> {
  return new MeasurementRouter(provider);
};