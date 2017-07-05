'use strict';

/**
 * Created by pulpeteam on 24/04/2017.
 */
module.exports = (provider) => {
	require('./_routes/program.routes')(provider);
	require('./_routes/authentication.routes')(provider);
	require('./_routes/member.routes')(provider);
	require('./_routes/coach.routes')(provider);
	require('./_routes/machine.route')(provider);
	require('./_routes/measurement.routes')(provider);
	require('./_routes/gym.routes')(provider);
	require('./_routes/exercise.routes')(provider);
	require('./_routes/document.routes')(provider);
	require('./_routes/demo.routes')(provider);
};
