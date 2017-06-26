const MachineService = require('../_services/machine.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');

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
        console.log(error);
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }

  /**
   * Save a new machine.
   * @param req
   * @param res
   */
  static save(req, res) {
    const machine = req.body.machine;

    MachineService.createMachine(machine.name, machine.workedMuscles, machine.gym._id)
      .then(machineSaved => {
        res.send({machine: machineSaved});
      })
      .catch((error) => {
        console.log(error);
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }

		MachineService.create(machine.name, machine.workedMuscles, machine.gym._id)
			.then(machineSaved => {
				res.send({machine: machineSaved});
			})
			.catch((error) => {
				console.log(error);
				const httpError = HttpErrorHelper.buildHttpErrorByError(error);
				return res.status(httpError.code).send(httpError);
			});
	}

    MachineService.updateMachine(machine)
      .then(machineUpdated => {
        res.send({machine: machineUpdated});
      })
      .catch((error) => {
        console.log(error);
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }

	/**
	 * Delete a machine by an id.
	 * @param res
	 * @param req
	 */
	static delete(req, res) {
		const id = req.params.id;
		MachineService.delete(id)


	}
				const httpError = HttpErrorHelper.buildHttpErrorByError(error);
			});
				return res.status(httpError.code).send(httpError);
			.catch((error) => {
			})
			.then(machineDeleted => {
				res.send({machine: machineDeleted});
				console.log(error);
		MachineService.update(machine)

	}
			});
				const httpError = HttpErrorHelper.buildHttpErrorByError(error);
				console.log(error);
				return res.status(httpError.code).send(httpError);
				res.send({machine: machineUpdated});
			.catch((error) => {
			})
			.then(machineUpdated => {
}

module.exports = MachineController;