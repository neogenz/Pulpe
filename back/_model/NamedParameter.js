class NamedParameter {
  constructor(name, value) {
    if (name === undefined || name === null) {
      throw new Error(`name property can't be null or undefined`);
    }
    if (value === undefined || value === null) {
      throw new Error(`value property can't be null or undefined`);
    }
    this.name = name;
    this.value = value;
  }
}

module.exports = NamedParameter;