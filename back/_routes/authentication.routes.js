'use strict';

const AuthenticationController = require('../_controllers/authentication.controller');

class AuthenticationRouter {
  constructor(provider) {
    provider.post('/signin', AuthenticationController.signin);
    provider.post('/signup', AuthenticationController.signup);
  }
}

module.exports = (provider)=> {
  return new AuthenticationRouter(provider);
};