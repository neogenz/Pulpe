const AuthenticationService = require('../_services/authentication.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const HTTP_CODE = require('../_helpers/HTTP_CODE.json');

class AuthenticationController {
  constructor() {
  }

  /**
   * Signin a member and return token.
   * @param req
   * @param res
   */
  static signinByEmailAndPassword(req, res) {
    const email = req.body.email,
      password = req.body.password;

    AuthenticationService.signinBy(email, password).then((token)=> {
      res.send({token: token});
    }).catch((err)=> {
      var httpError = HttpErrorHelper.buildHttpErrorBy(HTTP_CODE.NOT_FOUND, err);
      //res.status(httpError.code);
      return res.status(httpError.code).send(httpError);
    });
  }


  /**
   * Signup a new member by firstname, lastname, email and password.
   * @param req
   * @param res
   */
  static signup(req, res) {
    const email = req.body.email,
      password = req.body.password,
      firstname = req.body.firstname,
      lastname = req.body.lastname,
      isCoach = req.body.isCoach;

    AuthenticationService.signupBy(firstname, lastname, email, password, isCoach).then((token)=> {
      res.send({token: token});
    }).catch((error)=> {
      const httpError = HttpErrorHelper.buildHttpErrorByError(error);
      //res.status(httpError.code);
      return res.status(httpError.code).send(httpError);
    });
  }
}

module.exports = AuthenticationController;