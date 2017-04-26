const MemberService = require('./member.service');
const Program = require('../_model/Program');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../_model/Errors').NotFoundError;

class ProgramService {
    constructor() {
    }

    /**
     * find a program for a member.
     * @param memberId
     * @returns {Promise|Promise.<Program>}
     */
    static findByMemberId(memberId) {
        return Program.findOne({'member_id': memberId})
            .then((program) => {
                if (!program) {
                    throw new NotFoundError("Programme introuvable pour l'adhérent : " + memberId);
                }
                return program;
            })
            .catch(function (err) {
                throw err;
            });
    }
}

module.exports = ProgramService;


