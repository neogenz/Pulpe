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
        const id = req.params.id;

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

}

module.exports = MachineController;