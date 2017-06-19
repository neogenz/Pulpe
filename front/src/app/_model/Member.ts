import {Program} from "./Program";
import {Measurement} from "./Measurement";
import {Gym} from "./Gym";
export class Member {

  constructor() {
  }

  public initFromRawObject(rawInitObject: any) {
    return this;
  }

  id: string;
  firstName: string;
  lastName: string;
  mail: string;
  password: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  age: string;
  availability: any; //// TODO: create class Planning
  objective: string;
  program: Program;
  profileCompleted: boolean;
  measurements: Measurement[];
  sessionFrequency: string;
  gym: Gym;
  createdAt: Date;

  public static of(): MemberBuilder {
    return new MemberBuilder();
  }
}


/**
 * Class used to implement Builder pattern.
 */
class MemberBuilder {
  private me: Member = new Member();

  public id(id: string): MemberBuilder {
    this.me.id = id;
    return this;
  }

  public lastName(lastName: string): MemberBuilder {
    this.me.lastName = lastName;
    return this;
  }

  public firstName(firstName: string): MemberBuilder {
    this.me.firstName = firstName;
    return this;
  }

  public mail(mail: string): MemberBuilder {
    this.me.mail = mail;
    return this;
  }

  public password(password: string): MemberBuilder {
    this.me.password = password;
    return this;
  }

  public address(address: string): MemberBuilder {
    this.me.address = address;
    return this;
  }

  public city(city: string): MemberBuilder {
    this.me.city = city;
    return this;
  }

  public country(country: string): MemberBuilder {
    this.me.country = country;
    return this;
  }

  public objective(objective: string): MemberBuilder {
    this.me.objective = objective;
    return this;
  }

  public profileCompleted(profileCompleted: boolean): MemberBuilder {
    this.me.profileCompleted = profileCompleted;
    return this;
  }

  public measurements(measurements: Measurement[]): MemberBuilder {
    this.me.measurements = measurements;
    return this;
  }

  public sessionFrequency(sessionFrequency: string): MemberBuilder {
    this.me.sessionFrequency = sessionFrequency;
    return this;
  }

  public createdAt(createdAt: Date): MemberBuilder {
    this.me.createdAt = createdAt;
    return this;
  }

  public gym(gym: Gym): MemberBuilder {
    this.me.gym = gym;
    return this;
  }

  public build(): Member {
    return this.me;
  }
}
