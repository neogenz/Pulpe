const MachineService = require('../_services/machine.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const winston = require('winston');

class MachineController {
  constructor() {
  }

  /**
   * Find all members of a coach linked by their gym.
   * @param req
   * @param res
   */
  static findAllByCoach(req, res) {
    const id = req.user._id;
    MachineService.findAllByCoach(id)
      .then(machines => {
        res.send({machines: machines});
      })
      .catch((error) => {
        winston.log('error', error.stack);
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }

  /**
   * Save a new machine.
   * @param req
   * @param res
   */
  static create(req, res) {
    const machine = req.body.machine;

    MachineService.create(machine)
      .then(machineSaved => {
        res.send({machine: machineSaved});
      })
      .catch((error) => {
        winston.log('error', error.stack);
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }

  static update(req, res) {
    const machine = req.body.machine;
    MachineService.update(machine)
      .then(machineUpdated => {
        res.send({machine: machineUpdated});
      })
      .catch((error) => {
        winston.log('error', error.stack);
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }

  /**
   * Delete a machine by an id.
   * @param req
   * @param res
   */
  static delete(req, res) {
    const id = req.params.id;

    MachineService.delete(id)
      .then(machineDeleted => {
        res.send({machine: machineDeleted});
      })
      .catch((error) => {
        winston.log('error', error.stack);
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }
}

module.exports = MachineController;