const ParamsVerificationHelper = require('../_helpers/ParamsVerificationHelper');
const NamedParameter = require('../_model/NamedParameter');
const ObjectiveEnum = require('../_enums/ObjectiveEnum');

class ProgramGenerationContext {
  constructor(params) {
    ParamsVerificationHelper.throwIfParamsAreUndefinedOrNull(
      new NamedParameter('member', params.member),
      new NamedParameter('isActive', params.isActive)
    );
    this.member = params.member;
    this.isActive = params.isActive;
    this.objective = ObjectiveEnum.fromName(this.member.objective);
  }
}

module.exports = ProgramGenerationContext;