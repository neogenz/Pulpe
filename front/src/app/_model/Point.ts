export class Point {

  constructor() {
  }

  public initFromRawObject(rawInitObject: any) {
    return this;
  }

  date: string;
  value: number;

  public static of(): PointBuilder {
    return new PointBuilder();
  }
}


/**
 * Class used to implement Builder pattern.
 */
class PointBuilder {
  private me: Point = new Point();

  public date(date: string): PointBuilder {
    this.me.date = date;
    return this;
  }

  public value(percentage: number): PointBuilder {
    this.me.value = percentage;
    return this;
  }

  public build(): Point {
    return this.me;
  }
}
