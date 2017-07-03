export class Document {

	constructor() {
	}

	public initFromRawObject(rawInitObject: any) {
		return this;
	}

	_id: string;
	data: string;
	format: string;
	memberId: string;
	coachId: string;

	public static of(): DocumentBuilder {
		return new DocumentBuilder();
	}
}


/**
 * Class used to implement Builder pattern.
 */
class DocumentBuilder {
	private me: Document = new Document();

	public id(id: string): DocumentBuilder {
		this.me._id = id;
		return this;
	}

	public data(data: string): DocumentBuilder {
		this.me.data = data;
		return this;
	}

	public format(format: string): DocumentBuilder {
		this.me.format = format;
		return this;
	}

	public memberId(memberId: string): DocumentBuilder {
		this.me.memberId = memberId;
		return this;
	}

	public coachId(coachId: string): DocumentBuilder {
		this.me.coachId = coachId;
		return this;
	}

	public build(): Document {
		return this.me;
	}
}
