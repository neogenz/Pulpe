'use strict';

const Gym = require('../_model/Gym');

class GymService {
    constructor() {

    }

    /**
     * Create then save a gym entity.
     * @param name
     * @param address
     * @param city
     * @param openingDates
     * @returns {Promise|Promise.<Gym>}
     */
    static createGym(name, address, city, openingDates) {
        let gym = new Gym({name: name, address: address, city: city, openingDates: openingDates});
        return gym.save().then(gymSaved => {
            return gymSaved;
        }).catch(error => {
            throw error;
        });
    }

    /**
     * Return a new gym is id isnt referenced, if not a new gym will be return.
     * @param id
     * @param name
     * @param address
     * @param city
     * @param openingDates
     * @returns {Promise|Promise.<Gym>}
     */
    static getOrCreateGym(id, name, address, city, openingDates) {
        if (id) {
            return this.findById(id);
        }
        return this.createGym(name, address, city, openingDates);

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

    /**
     * Find a Gym by his name.
     * @param name
     * @returns {Promise.<Gym>|Promise}
     */
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

    /**
     * Find a Gym by an id.
     * @param id
     * @returns {Promise.<Gym>|Promise}
     */
    static findById(id) {
        return Gym.findOne({'_id': id})
            .then(
                founded => {
                    return founded;
                }).catch(
                error => {
                    throw error;
                }
            );
    }

    /**
     * Find all gyms.
     * @returns {Promise|Promise.<Gym>}
     */
    static findAll() {
        return Gym.find()
            .then(
                gyms => {
                    return gyms;
                }).catch(
                error => {
                    throw error;
                }
            );
    }
}

module.exports = GymService;