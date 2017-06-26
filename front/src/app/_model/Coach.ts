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
  gender: string;
  address: string;
  city: string;
  email: string;
  country: string;
  objective: string;
  profileCompleted: boolean;
  birthDate: Date;
  gym: Gym;
  createdAt:Date;

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

  public email(email: string): CoachBuilder {
    this.me.email = email;
    return this;
  }

  public country(country: string): CoachBuilder {
    this.me.country = country;
    return this;
  }

  public birthDate(birthDate: Date): CoachBuilder {
    this.me.birthDate = birthDate;
    return this;
  }

  public profileCompleted(profileCompleted: boolean): CoachBuilder {
    this.me.profileCompleted = profileCompleted;
    return this;
  }

  public gender(gender: string): CoachBuilder {
    this.me.gender = gender;
    return this;
  }
  
  public gym(gym: Gym): CoachBuilder {
    this.me.gym = gym;
    return this;
  }

  public createdAt(createdAt: Date): CoachBuilder {
    this.me.createdAt = createdAt;
    return this;
  }

  public build(): Coach {
    return this.me;
  }
}
