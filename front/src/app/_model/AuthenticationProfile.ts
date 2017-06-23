import {Gym} from "./Gym";
export class AuthenticationProfile {
  constructor() {

  }

  public id:string;
  public token:string;
  public login:string;
  public password:string;
  public rememberMe:boolean;
  public lastName:string;
  public firstName:string;
  public profileCompleted:boolean;
  public isCoach:boolean;
  public gym:Gym;

  public static of():AuthenticationProfileBuilder {
    return new AuthenticationProfileBuilder();
  }
}

/**
 * Class used to implement Builder pattern.
 */
class AuthenticationProfileBuilder {
  private me:AuthenticationProfile = new AuthenticationProfile();

  public id(id:string):AuthenticationProfileBuilder{
    this.me.id = id;
    return this;
  }

  public token(token:string):AuthenticationProfileBuilder {
    this.me.token = token;
    return this;
  }

  public login(login:string):AuthenticationProfileBuilder {
    this.me.login = login;
    return this;
  }

  public password(password:string):AuthenticationProfileBuilder {
    this.me.password = password;
    return this;
  }

  public rememberMe(rememberMe:boolean):AuthenticationProfileBuilder {
    this.me.rememberMe = rememberMe;
    return this;
  }

  public lastName(lastName:string):AuthenticationProfileBuilder {
    this.me.lastName = lastName;
    return this;
  }

  public firstName(firstName:string):AuthenticationProfileBuilder {
    this.me.firstName = firstName;
    return this;
  }

  public profileCompleted(profileCompleted:boolean):AuthenticationProfileBuilder{
    this.me.profileCompleted = profileCompleted;
    return this;
  }

  public isCoach(isCoach:boolean):AuthenticationProfileBuilder {
    this.me.isCoach = isCoach;
    return this;
  }

  public gym(gym:Gym):AuthenticationProfileBuilder {
    this.me.gym = gym;
    return this;
  }

  public build():AuthenticationProfile {
    return this.me;
  }
}