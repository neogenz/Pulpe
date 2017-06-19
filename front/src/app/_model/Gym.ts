export class Gym {

  constructor() {
  }

  public initFromRawObject(rawInitObject: any) {
    return this;
  }

  id: string;
  name: string;
  address: string;
  city: string;

  public static of(): GymBuilder {
    return new GymBuilder();
  }
}


/**
 * Class used to implement Builder pattern.
 */
class GymBuilder {
  private me: Gym = new Gym();

  public id(id: string): GymBuilder {
    this.me.id = id;
    return this;
  }

  public name(name: string): GymBuilder {
    this.me.name = name;
    return this;
  }

  public address(address: string): GymBuilder {
    this.me.address = address;
    return this;
  }

  public city(city: string): GymBuilder {
    this.me.city = city;
    return this;
  }

  public build(): Gym {
    return this.me;
  }
}
