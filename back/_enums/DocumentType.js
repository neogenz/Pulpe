class DocumentType {

	constructor(name, code) {
		this.name = name;
		this.code = code;
	}

	toString() {
		return `${this.name}`;
	}

	static getName(code) {
		return DocumentType[code].name;
	}
}

DocumentType.PNG = new DocumentType('PNG', 'png');
DocumentType.JPG = new DocumentType('JPG', 'jpg');
DocumentType.PDF = new DocumentType('PDF', 'pdf');

module.exports = DocumentType;