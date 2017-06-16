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
     * Signin the user
     * @param email
     * @param password
     * @param isCoach
     */
    static signinBy(email, password, isCoach) {
        return MemberService.findBy(email, password, isCoach).then(
            (member) => {
                var token = jwt.sign(member.toObject(), process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                });
                return token;
            }, (error) => {
                if (error instanceof NotFoundError) {
                    throw new Error('Email ou mot de passe introuvable.');
                }
                throw error;
            }).catch(err => {
                throw err;
            }
        );
        //return  (login, password).then(function (agent) {
        //  try {
        //    var token = jwt.sign(agent.toObject(), process.env.JWT_SECRET, {
        //      expiresIn: "86400000" // expires in 24 hours
        //    });
        //    return token;
        //  } catch (err) {
        //    err.statusHttp = 500;
        //    throw err;
        //  }
        //}).catch(function (err) {
        //  return err;
        //});
    }

    /**
     * Create member and return an token to authenticate them.
     * @param firstname
     * @param lastname
     * @param email
     * @param password
     * @param isCoach
     * @returns {Promise.<string>|Promise}
     */
    static signupBy(firstname, lastname, email, password, isCoach) {
        let member;
        let coach;
        if (isCoach) {
            coach = new Coach();
            coach.firstName = firstname;
            coach.lastName = lastname;
            coach.email = email;
            coach.password = password;
        } else {
            member = new Member();
            member.firstName = firstname;
            member.lastName = lastname;
            member.email = email;
            member.password = password;
        }
        if (!isCoach) {
            return MemberService.createMember(member).then(
                (member) => {
                    const token = jwt.sign(member.toObject(), process.env.JWT_SECRET, {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    });
                    return token;
                },
                (error) => {
                    throw error;
                }).catch(error => {
                throw error;
            });
        } else {
            return CoachService.createCoach(coach).then(
                (member) => {
                    const token = jwt.sign(member.toObject(), process.env.JWT_SECRET, {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    });
                    return token;
                },
                (error) => {
                    throw error;
                }).catch(error => {
                throw error;
            });
        }
    }


}

module.exports = AuthenticationService;


