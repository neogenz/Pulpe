import {Program} from "./Program";
import {Measurement} from "./Measurement";
import {Gym} from "./Gym";
import {WorkedMuscles} from "./WorkedMuscles";
export class Machine {

	constructor() {
	}

	public initFromRawObject(rawInitObject: any) {
		return this;
	}

	_id: string;
	name: string;
	workedMuscles: WorkedMuscles[];
	gym: Gym;

	public static of(): MachineBuilder {
		return new MachineBuilder();
	}
}

/**
 * Class used to implement Builder pattern.
 */
class MachineBuilder {
	private me: Machine = new Machine();

	public id(_id: string): MachineBuilder {
		this.me._id = _id;
		return this;
	}

	public name(name: string): MachineBuilder {
		this.me.name = name;
		return this;
	}

	public workedMuscles(workedMuscles: WorkedMuscles[]): MachineBuilder {
		this.me.workedMuscles = workedMuscles;
		return this;
	}

	public gym(gym: Gym): MachineBuilder {
		this.me.gym = gym;
		return this;
	}

	public build(): Machine {
		return this.me;
	}
}
