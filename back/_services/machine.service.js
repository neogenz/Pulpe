'use strict';

const Machine = require('../_model/Machine');
const MuscleEnum = require('../_enums/MuscleEnum');

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
}

module.exports = MachineService;