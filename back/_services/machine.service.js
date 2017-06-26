'use strict';

const Machine = require('../_model/Machine');
const MuscleEnum = require('../_enums/MuscleEnum');
const Gym = require('../_model/Gym');
const InstanceError = require('../_model/Errors').InstanceError;
const CoachService = require('../_services/coach.service');
const TechnicalError = require('../_model/Errors').TechnicalError;
const NotFoundError = require('../_model/Errors').NotFoundError;

class MachineService {
	constructor() {
	}

	/**
	 * Find a machine by an id.
	 * @param id
	 * @returns {Promise|Promise.<Machine>}
	 */
	static findById(id) {
		return Machine.findOne({'_id': id})
			.then((machine) => {
				if (!machine) {
					throw new NotFoundError('Machine introuvable.');
				}
				return machine;
			})
			.catch(err => {
				throw new TechnicalError(err.message);
			});
	}

	static create(name, workedMuscles, gym) {
		let machine = new Machine({
			name: name,
			workedMuscles: workedMuscles,
			gym: gym
		});
		return MachineService.save(machine);
	}

	/**
	 * Update a machine.
	 * @param machine
	 * @returns {Promise|Promise.<Machine>}
	 */
	static update(machine) {
		return this.findById(machine._id)
			.then(machineFinded => {
				machineFinded.workedMuscles = machine.workedMuscles;
				machineFinded.name = machine.name;
				return this.save(machineFinded);
			}, (error) => {
				throw error;
			})
			.then((machineSaved) => {
				return machineSaved;
			}, (error) => {
				throw error;
			})
			.catch(error => {
				throw error
			});
	}

	/**
	 * Save a new machine
	 * @param machine
	 * @returns {Promise|Promise.<Machine>}
	 */
	static save(machine) {
		return machine.save().then(saved => {
			return saved
		}).catch(error => {
			throw error
		});
	}

	/**
	 * Delete and return a machine by an id.
	 * @param id
	 * @returns {Promise.<Machine>|Promise}
	 */
	static delete(id) {
		return Machine.findByIdAndRemove(id)
			.then((machineDeleted) => {
				return machineDeleted;
			}, (error) => {
				console.error(error.stack);
				throw new TechnicalError(error.message);
			})
			.catch((error) => {
				throw error;
			});
	}

	static findSpecificNumberOfMachinesUsableToTraining(number) {
		return Machine.find({
			'workedMuscles.name': MuscleEnum.Cardiovascular.toString()
		}).limit(number)
			.then(machinesUsableToTraining => {
				return machinesUsableToTraining;
			}).catch(error => {
				throw error;
			})
	}

	/**
	 * Find all machines of a coach linked by their gym.
	 * @param id of coach
	 * @returns {Promise.<Member[]>|Promise}
	 */
	static findAllByCoach(id) {
		return CoachService.findById(id)
			.then(coachFinded => {
				return this.findAllByGym(coachFinded.gym);
			}, (error) => {
				console.error(error.stack);
				throw new TechnicalError(error.message);
			})
			.then(machines => {
				return machines;
			}, (error) => {
				console.error(error.stack);
				throw new TechnicalError(error.message);
			})
			.catch((error) => {
				throw error;
			});
	}


	static findAllByGym(gym) {
		if (!_instanceOfGym(gym)) {
			throw new InstanceError('The parameter isn\'t an instance of Gym class.');
		}
		const populationGraph = {
			path: 'gym',
			model: 'Gym'
		};
		return Machine.find({'gym': gym._id}).populate(populationGraph);
	}


}

function _instanceOfGym(gym) {
	return gym instanceof Gym;
}

module.exports = MachineService;