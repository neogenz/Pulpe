'use strict';
/**
 * Created by pulpeteam on 24/04/2017.
 */

module.exports = (provider) => {
  require('./_routes/program.routes')(provider);
  require('./_routes/authentication.routes')(provider);
};
