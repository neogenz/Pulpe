const ProgramService = require('../_services/program.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const HTTP_CODE = require('../_helpers/HTTP_CODE.json');

class ProgramController {
    constructor() {
    }

    static findByMemberId(req, res) {
        const memberId = req.params.memberId;

        ProgramService.findByMemberId(memberId)
            .then((program) => {
                res.send({program: program});
            })
            .catch((err) => {
                const httpError = HttpErrorHelper.buildHttpErrorByError(err);
                return res.status(httpError.code).send(httpError);
            });
    }
}

module.exports = ProgramController;