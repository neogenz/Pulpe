'use strict';

const Gym = require('../_model/Gym');

class GymService {
  constructor() {

  }

  /**
   * Create then save a gym entity.
   * @param name
   * @param address
   * @param openingHour
   * @param closingHour
   * @returns {Promise|Promise.<Gym>}
   */
  static createGym(name, address, openingDates) {
    let gym = new Gym({name: name, address: address, openingDates: openingDates});
    return gym.save().then(gymSaved => {
      return gymSaved;
    }).catch(error => {
      throw error;
    });
  }

  /**
   * Set the gym of machine and save them.
   * @param machine
   * @param gym
   * @returns {Promise|Promise.<Machine>}
   */
  static addMachine(machine, gym) {
    machine.gym = gym;
    return machine.save().then(machineSaved => {
      return machineSaved;
    }).catch(error => {
      throw error;
    });
  }

  static findByName(name) {
    return Gym.findOne({name: name}).then(
      founded => {
        return founded;
      }).catch(
      error => {
        throw error;
      }
    );
  }
}

module.exports = GymService;