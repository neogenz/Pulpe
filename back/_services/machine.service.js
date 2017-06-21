'use strict';

const Machine = require('../_model/Machine');
const MuscleEnum = require('../_enums/MuscleEnum');
const Gym = require('../_model/Gym');
const InstanceError = require('../_model/Errors').InstanceError;
const CoachService = require('../_services/coach.service');
const TechnicalError = require('../_model/Errors').TechnicalError;

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
    return Machine.find({'gym': gym._id});
  }


}

function _instanceOfGym(gym) {
  return gym instanceof Gym;
}

module.exports = MachineService;