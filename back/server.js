'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const moment = require('moment');
moment.locale('fr');
const winston = require('winston');
const app = express();
const bodyParser = require('body-parser');
process.env.NODE_ENV = 'development';
const configHelper = require('./_helpers/ConfigHelper')(process.env.NODE_ENV);
const endpointConfig = require('./_config/endpoint.json')[process.env.NODE_ENV];
process.env.PORT = endpointConfig.portNumber;
process.env.LOG_LEVEL = 'debug';

// configuration ==============================================================
app.set('port', process.env.PORT || endpointConfig.portNumber);
app.use(morgan('dev'));
process.env.JWT_SECRET = 'applicationesimedpulpe';
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
winston.level = process.env.LOG_LEVEL;

// Run server ==================================================================
mongoose.Promise = global.Promise;
mongoose.connect(configHelper.buildDatabaseConnectionURI());
mongoose.connection.on('connected', function () {
	mongoose.set('debug', false);

	console.log('Mongoose default connection open to ' + configHelper.buildDatabaseConnectionURI());
	require('./routing')(app);

	let ObjectiveEnum = require('./_enums/ObjectiveEnum');
	let GymService = require('./_services/gym.service');
	let MachineService = require('./_services/machine.service');
	let Machine = require('./_model/Machine');
	let DifficultyEnum = require('./_enums/DifficultyEnum');
	let MuscleEnum = require('./_enums/MuscleEnum');
	let ExerciseGroupTypeEnum = require('./_enums/ExerciseGroupTypeEnum');
	let SessionService = require('./_services/session.service');
	let ProgramService = require('./_services/program.service');
	let BodybuildingExercise = require('./_model/BodybuildingExercise');
	let ExerciseService = require('./_services/exercise.service');
	let ExerciseReferenceInformationService = require('./_services/exerciseReferenceInformation.service');

	//mongoose.connection.collections['Machines'].drop()
	/*	.then(() => {
			return mongoose.connection.collections['Gyms'].drop();
		}, error => {
			return mongoose.connection.collections['Gyms'].drop();
		})*/
	/*	.then(() => {
			return mongoose.connection.collections['Exercises'].drop();
		}, error => {
			return mongoose.connection.collections['Exercises'].drop();
		})
		.then(() => {
			return mongoose.connection.collections['Programs'].drop();
		}, error => {
			return mongoose.connection.collections['Programs'].drop();
		})*/
	//.then(() => {
	mongoose.connection.collections['ExercisesReferencesInformations'].drop()
		//}, error => {
		//	return mongoose.connection.collections['ExercisesReferencesInformations'].drop();
		//	})
		.then(() => {
			return ExerciseReferenceInformationService.initExercisesReferencesInformations();
		}, error => {
			return ExerciseReferenceInformationService.initExercisesReferencesInformations();
		})
		.then(() => {
			return ExerciseReferenceInformationService.findAll();
		})
		/* .then((exercisesReferencesInformations) => {
			global.exercisesReferencesInformations = exercisesReferencesInformations;
			return GymService.findAll();
			  return GymService.createGym('Keep cool', '20 Place pan carre', 'Avignon',
				{
				monday: {
					openingHour: moment("08:00", "HH:mm").toDate(),
					closingHour: moment("21:00", "HH:mm").toDate()
				},
				tuesday: {
					openingHour: moment("08:00", "HH:mm").toDate(),
					closingHour: moment("21:00", "HH:mm").toDate()
				},
				wednesday: {
					openingHour: moment("08:00", "HH:mm").toDate(),
					closingHour: moment("21:00", "HH:mm").toDate()
				},
				thursday: {
					openingHour: moment("08:00", "HH:mm").toDate(),
					closingHour: moment("21:00", "HH:mm").toDate()
				},
				friday: {
					openingHour: moment("08:00", "HH:mm").toDate(),
					closingHour: moment("21:00", "HH:mm").toDate()
				},
				saturday: {
					openingHour: moment("08:00", "HH:mm").toDate(),
					closingHour: moment("23:00", "HH:mm").toDate()
				},
				sunday: {
					openingHour: moment("08:00", "HH:mm").toDate(),
					closingHour: moment("21:00", "HH:mm").toDate()
				}
				}
			)*/
		.catch(error => {
			console.error(error);
		});
});
// If the connection throws an error
mongoose.connection.on('error', function (err) {
	console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose default connection disconnected through app termination.');
		process.exit(0);
	});
});

app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));
