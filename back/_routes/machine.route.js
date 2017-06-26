'use strict';

const MachineController = require('../_controllers/machine.controller');

class MachineRouter {
	constructor(provider) {
		provider.get('/machines/coachs/:id', MachineController.findAllByCoach);
		provider.post('/machines', MachineController.save);
		provider.put('/machines', MachineController.update);
		provider.delete('/machines/:id', MachineController.delete);
	}
}

module.exports = (provider) => {
	return new MachineRouter(provider);
};