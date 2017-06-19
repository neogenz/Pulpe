const AuthenticationService = require('../_services/authentication.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const HTTP_CODE = require('../_helpers/HTTP_CODE.json');
const jwt = require('jsonwebtoken');

class AuthenticationController {
  constructor() {
  }

  /**
   * Signin a member and return token.
   * @param req
   * @param res
   */
  static signin(req, res) {
    const email = req.body.email,
      password = req.body.password;

    AuthenticationService.signinBy(email, password)
      .then((resp) => {
        res.send({token: resp.token, isCoach: resp.isCoach});
      }).catch((err) => {
      var httpError = HttpErrorHelper.buildHttpErrorBy(HTTP_CODE.NOT_FOUND, err);
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


    AuthenticationService.signupBy(firstname, lastname, email, password, isCoach)
      .then((token) => {
        res.send({token: token});
      }).catch((error) => {
      const httpError = HttpErrorHelper.buildHttpErrorByError(error);
      return res.status(httpError.code).send(httpError);
    });
  }

  static ensureAuthorized(req, res, next) {
    let bearerToken = null,
      bearerHeader = req.headers.authorization,
      bearer = null;
    if (bearerHeader !== undefined) {
      bearer = bearerHeader.split(' ');
      bearerToken = bearer[1];
      jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          let httpError = HttpErrorHelper.buildHttpErrorBy(HTTP_CODE.FORBIDDEN, err);
          return res.status(httpError.code).send(httpError);
        }
        // if everything is good, save to request for use in other routes
        req.user = decoded;
        next();
      });
    } else {
      var httpError = HttpErrorHelper.buildHttpErrorBy(HTTP_CODE.FORBIDDEN, null, 'Veuillez vous authentifier.');
      return res.status(httpError.code).send(httpError);
    }
  }

}

module.exports = AuthenticationController;