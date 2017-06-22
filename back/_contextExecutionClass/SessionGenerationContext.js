const ParamsVerificationHelper = require('../_helpers/ParamsVerificationHelper');
const NamedParameter = require('../_model/NamedParameter');

class SessionGenerationContext {
  constructor(session, musclesRepartitions) {
    ParamsVerificationHelper.throwIfParamsAreUndefinedOrNull(
      new NamedParameter('session', session),
      new NamedParameter('musclesRepartitions', musclesRepartitions));
    this.session = session;
    this.musclesRepartitions = musclesRepartitions;
  }
}

module.exports = SessionGenerationContext;