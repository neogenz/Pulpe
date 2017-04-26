const MemberService = require('../_services/member.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const HTTP_CODE = require('../_helpers/HTTP_CODE.json');

class MemberController {
    constructor() {
    }

    /**
     * Add measurements for a member.
     * @param req
     * @param res
     */
    static addMeasurements(req, res) {
        const memberId = req.params.id;
        const measurements = req.body.measurements;

        MemberService.addMeasurements(memberId, measurements)
            .then(member => {
                res.send({member: member});
            })
            .catch((error) => {
                const httpError = HttpErrorHelper.buildHttpErrorByError(error);
                return res.status(httpError.code).send(httpError);
            });
    }
}

module.exports = MemberController;