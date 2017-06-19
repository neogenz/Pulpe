import {Gym} from "./Gym";
export class Coach {

  constructor() {
  }

  public initFromRawObject(rawInitObject: any) {
    return this;
  }

  id: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  email: string;
  country: string;
  objective: string;
  profileCompleted: boolean;
  dateOfBirth: Date;
  gym: Gym;

  public static of(): CoachBuilder {
    return new CoachBuilder();
  }
}


/**
 * Class used to implement Builder pattern.
 */
class CoachBuilder {
  private me: Coach = new Coach();

  public id(id: string): CoachBuilder {
    this.me.id = id;
    return this;
  }

  public lastName(lastName: string): CoachBuilder {
    this.me.lastName = lastName;
    return this;
  }

  public firstName(firstName: string): CoachBuilder {
    this.me.firstName = firstName;
    return this;
  }

  public address(address: string): CoachBuilder {
    this.me.address = address;
    return this;
  }

  public city(city: string): CoachBuilder {
    this.me.city = city;
    return this;
  }

  public country(country: string): CoachBuilder {
    this.me.country = country;
    return this;
  }

  public dateOfBirth(dateOfBirth: Date): CoachBuilder {
    this.me.dateOfBirth = dateOfBirth;
    return this;
  }

  public profileCompleted(profileCompleted: boolean): CoachBuilder {
    this.me.profileCompleted = profileCompleted;
    return this;
  }

  public gym(gym: Gym): CoachBuilder {
    this.me.gym = gym;
    return this;
  }

  public build(): Coach {
    return this.me;
  }
}
