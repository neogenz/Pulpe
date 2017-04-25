const MemberService = require('./member.service');
const Member = require('../_model/Member');
const jwt = require('jsonwebtoken');

class AuthenticationService {
  constructor() {
  }

  /**
   * Signin the user
   * @param email
   * @param password
   */
  static signinBy(email, password) {
    return MemberService.findByEmailAndPassword(email, password).then(
      (member)=> {
        var token = jwt.sign(member.toObject(), process.env.JWT_SECRET, {
          expiresIn: "86400000" // expires in 24 hours
        });
        return token;
      }, (error)=> {
        throw error;
      }).catch(err=> {
        err.statusHttp = 500;
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
   * @returns {Promise.<string>|Promise}
   */
  static signupBy(firstname, lastname, email, password) {
    const member = new Member();
    member.firstName = firstname;
    member.lastName = lastname;
    member.email = email;
    member.password = password;
    return MemberService.createMember(member).then(
      (member)=> {
        const token = jwt.sign(member.toObject(), process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
        return token;
      },
      (error)=> {
        throw error;
      }).catch(error => {
      throw error;
    });
  }
}

module.exports = AuthenticationService;


