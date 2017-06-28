export class Point {

	constructor() {
	}

	public initFromRawObject(rawInitObject: any) {
		return this;
	}

	date: Date;
	percentage: number;

	public static of(): PointBuilder {
		return new PointBuilder();
	}
}


/**
 * Class used to implement Builder pattern.
 */
class PointBuilder {
	private me: Point = new Point();

	public date(date: Date): PointBuilder {
		this.me.date = date;
		return this;
	}

	public percentage(percentage: number): PointBuilder {
		this.me.percentage = percentage;
		return this;
	}

	public build(): Point {
		return this.me;
	}
}
