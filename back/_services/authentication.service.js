const MemberService = require('./member.service');
const CoachService = require('./coach.service');
const Member = require('../_model/Member');
const Coach = require('../_model/Coach');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../_model/Errors').NotFoundError;

class AuthenticationService {
    constructor() {
    }

    /**
     * Signin the user or the coach.
     * @param email
     * @param password
     */
    static signinBy(email, password) {
        let isCoach = false;
        return CoachService.findBy(email, password)
            .then((coachFinded) => {
                isCoach = true;
                return coachFinded;
            }, (error) => {
                if (error instanceof NotFoundError) {
                    return MemberService.findBy(email, password);
                } 
                console.error(error.stack);
                throw error;
            })
            .then(user => {
                const token = _generateToken(user);
                return {
                    token: token,
                    isCoach: isCoach
                };
            }, (error) => {
                console.error(error.stack);
                throw error;
            })
            .catch(error => {
                throw error;
            });
    }


    /**
     * Create member or a coach and return a token to authenticate them.
     * @param firstname
     * @param lastname
     * @param email
     * @param password
     * @param isCoach
     * @returns {Promise.<string>|Promise}
     */
    static signupBy(firstname, lastname, email, password, isCoach) {
        if (isCoach) {
            const coach = new Coach();
            coach.firstName = firstname;
            coach.lastName = lastname;
            coach.email = email;
            coach.password = password;
            return _signupCoach(coach);
        }

        const member = new Member();
        member.firstName = firstname;
        member.lastName = lastname;
        member.email = email;
        member.password = password;
        return _signupMember(member);
    }
}


function _signupMember(member) {
    return MemberService.create(member)
        .then((memberCreated) => {
            return _generateToken(memberCreated);
        }, (error) => {
            throw error;
        })
        .catch(error => {
            throw error;
        });
}

function _signupCoach(coach) {
    return CoachService.create(coach)
        .then((coachCreated) => {
            return _generateToken(coachCreated);
        }, (error) => {
            throw error;
        })
        .catch(error => {
            throw error;
        });
}

function _generateToken(obj) {
    return jwt.sign(obj.toObject(), process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}

module.exports = AuthenticationService;


