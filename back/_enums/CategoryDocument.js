class CategoryDocument {

	constructor(name, code) {
		this.name = name;
	}

	toString() {
		return `${this.name}`;
	}
	static fromName(name) {
		return CategoryDocument[name];
	}

	static getName(code) {
		return CategoryDocument[code].name;
	}
}

CategoryDocument.Profile = new CategoryDocument('Profile');

module.exports = CategoryDocument;