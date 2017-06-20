const ParamsError = require('../_model/Errors').ParamsError;

class ParamsVerificationHelper {
  constructor() {
  }

  /**
   * Test each params and throw ParamsError if one is undefined or null.
   * @param {...NamedParameter} params
   */
  static throwIfParamsAreUndefinedOrNull(...params) {
    params.forEach(param => {
      if (param.value === undefined || param.value === null) {
        throw new ParamsError(`${param.name} is undefined or null.`);
      }
    });
  }
}

module.exports = ParamsVerificationHelper;