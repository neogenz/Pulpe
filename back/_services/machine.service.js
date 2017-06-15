'use strict';

const Machine = require('../_model/Machine');
const MuscleEnum = require('../_enums/MuscleEnum');
const Gym = require('../_model/Gym');
const InstanceError = require('../_model/Errors').InstanceError;

class MachineService {
  constructor() {

  }

  static createMachine(name, workedMuscles, gym) {
    let machine = new Machine({
      name: name,
      workedMuscles: workedMuscles,
      gym_id: gym
    });
    return MachineService.saveMachine(machine);
  }

  static saveMachine(machine) {
    return machine.save().then(saved => {
      return saved
    }).catch(error => {
      throw error
    });
  }

  static findSpecificNumberOfMachinesUsableToTraining(number) {
    return Machine.find({
      'workedMuscles.name': MuscleEnum.CARDIO.toString()
    }).limit(number)
      .then(machinesUsableToTraining => {
        return machinesUsableToTraining;
      }).catch(error => {
        throw error;
      })
  }


  static findAllByGym(gym) {
    if (!_instanceOfGym(gym)) {
      throw new InstanceError('The parameter isn\'t an instance of Gym class.');
    }
    return Machine.find({'gym': gym._id});
  }


}

function _instanceOfGym(gym) {
  return gym instanceof Gym;
}

module.exports = MachineService;