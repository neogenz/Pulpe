const ParamsVerificationHelper = require('../_helpers/ParamsVerificationHelper');
const NamedParameter = require('../_model/NamedParameter');

class SessionGenerationContext {
  constructor(session, musclesRepartitions, gym) {
    ParamsVerificationHelper.throwIfParamsAreUndefinedOrNull(
      new NamedParameter('session', session),
      new NamedParameter('gym', gym),
      new NamedParameter('musclesRepartitions', musclesRepartitions));
    this.session = session;
    this.musclesRepartitions = musclesRepartitions;
    this.gym = gym;
  }
}

module.exports = SessionGenerationContext;