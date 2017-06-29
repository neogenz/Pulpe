export class Dashboard {

  constructor() {
  }

  public initFromRawObject(rawInitObject: any) {
    return this;
  }

  nbMembers: string;
  nbExercises: string;
  nbMachines: string;

  public static of(): DashboardBuilder {
    return new DashboardBuilder();
  }
}


/**
 * Class used to implement Builder pattern.
 */
class DashboardBuilder {
  private me: Dashboard = new Dashboard();

  public nbMembers(nbMembers: string): DashboardBuilder {
    this.me.nbMembers = nbMembers;
    return this;
  }

  public nbExercises(nbExercises: string): DashboardBuilder {
    this.me.nbExercises = nbExercises;
    return this;
  }

  public nbMachines(nbMachines: string): DashboardBuilder {
    this.me.nbMachines = nbMachines;
    return this;
  }

  public build(): Dashboard {
    return this.me;
  }
}
