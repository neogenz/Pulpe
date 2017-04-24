export class AuthenticationProfile {
  constructor() {

  }

  public token:string;
  public login:string;
  public password:string;
  public rememberMe:boolean;

  public static of():AuthenticationProfileBuilder {
    return new AuthenticationProfileBuilder();
  }
}

class AuthenticationProfileBuilder {
  private me:AuthenticationProfile = new AuthenticationProfile();

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

  public build():AuthenticationProfile {
    return this.me;
  }
}