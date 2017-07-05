const AuthenticationService = require('../_services/authentication.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const HTTP_CODE = require('../_helpers/HTTP_CODE.json');
const jwt = require('jsonwebtoken');
const CoachService = require('../_services/coach.service');
const NotFoundError = require('../_model/Errors').NotFoundError;
const winston = require('winston');

class AuthenticationController {
  constructor() {
  }

  /**
   * Signin a member and return token.
   * @param req
   * @param res
   */
  static signin(req, res) {
    const email = req.body.email.toLowerCase(),
      password = req.body.password;

    AuthenticationService.signinBy(email, password)
      .then((resp) => {
        winston.log('info', `Is coach : ${resp.isCoach}`);
        res.send({token: resp.token, isCoach: resp.isCoach});
      }).catch((err) => {
      winston.log('error', err.stack);
      let httpError = HttpErrorHelper.buildHttpErrorBy(HTTP_CODE.NOT_FOUND, err);
      return res.status(httpError.code).send(httpError);
    });
  }


  /**
   * Signup a new member by firstname, lastname, email and password.
   * @param req
   * @param res
   */
  static signup(req, res) {
    const email = req.body.email.toLowerCase(),
      password = req.body.password,
      firstname = req.body.firstname,
      lastname = req.body.lastname,
      isCoach = req.body.isCoach;


    AuthenticationService.signupBy(firstname, lastname, email, password, isCoach)
      .then((token) => {
        res.send({token: token});
      }).catch((error) => {
        winston.log('error', error.stack);
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      }
    );
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
      winston.log('warn', `Token undefined`);
      let httpError = HttpErrorHelper.buildHttpErrorBy(HTTP_CODE.FORBIDDEN, null, 'Veuillez vous authentifier.');
      return res.status(httpError.code).send(httpError);
    }
  }

  static mustBeCoach(req, res, next) {
    return CoachService.findById(req.user._id).then(coach => {
      req.user = coach;
      next();
    }, error => {
      winston.log('error', error.stack ? error.stack : error);
      if (error instanceof NotFoundError) {
        let httpError = HttpErrorHelper.buildHttpErrorBy(HTTP_CODE.FORBIDDEN, null, 'Vous devez être un coach pour accéder à ce service.');
        return res.status(httpError.code).send(httpError);
      }
      let httpError = HttpErrorHelper.buildHttpErrorByError(error);
      return res.status(httpError.code).send(httpError);
    });
  }
}

module.exports = AuthenticationController;