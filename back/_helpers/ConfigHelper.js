'use strict';

class ConfigHelper {
  constructor(environment) {
    this.dbConfig = require('../_config/database.json')[environment];
  }

  buildDatabaseConnectionURI() {
    return `${this.dbConfig.mongo.protocol}://${this.dbConfig.mongo.host}/${this.dbConfig.mongo.name}`;
  }
}

module.exports = (environment) => {
  return new ConfigHelper(environment);
};