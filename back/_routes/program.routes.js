'use strict';

const programController = require('../_controllers/program.controller');

class ProgramRouter {
  constructor(provider) {
    provider.get('/program', programController.findProgram);
  }
}

module.exports = (provider)=> {
  return new ProgramRouter(provider);
};