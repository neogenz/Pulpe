const CoachService = require('../_services/coach.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');

class CoachController {
    constructor() {
    }

    /**
     * Find a coach by an id.
     * @param req
     * @param res
     */
    static findById(req, res) {
        const id = req.params.id;

        CoachService.findById(id)
            .then(coach => {
                res.send({coach: coach});
            })
            .catch((error) => {
                console.log(error);
                const httpError = HttpErrorHelper.buildHttpErrorByError(error);
                return res.status(httpError.code).send(httpError);
            });
    }

    /**
     * Add measurement to a member and complete his profile.
     * @param req
     * @param res
     */
    static completeProfile(req, res) {
        const coachId = req.params.id,
            birthDate = new Date(req.body.birthDate),
            gym = req.body.gym;

        CoachService.completeProfile(coachId, gym, birthDate)
            .then(coach => {
                res.send({coach: coach});
            })
            .catch((error) => {
                const httpError = HttpErrorHelper.buildHttpErrorByError(error);
                return res.status(httpError.code).send(httpError);
            });
    }
}

module.exports = CoachController;