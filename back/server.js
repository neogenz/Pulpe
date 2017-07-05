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
app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));
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

	mongoose.connection.collections['Machines'].drop()
	 .then(() => {
	   return mongoose.connection.collections['Gyms'].drop();
	 }, error => {
	   return mongoose.connection.collections['Gyms'].drop();
	 })
		.then(() => {
			return mongoose.connection.collections['Exercises'].drop();
		}, error => {
			return mongoose.connection.collections['Exercises'].drop();
		})
		 .then(() => {
		   return mongoose.connection.collections['Programs'].drop();
		 }, error => {
		   return mongoose.connection.collections['Programs'].drop();
		 })
		.then(() => {
			return mongoose.connection.collections['Sessions'].drop();
		}, error => {
			return mongoose.connection.collections['Sessions'].drop();
		})
		.then(() => {
			return mongoose.connection.collections['ExercisesReferencesInformations'].drop();
		}, error => {
			return mongoose.connection.collections['ExercisesReferencesInformations'].drop();
		})
		.then(() => {
			return ExerciseReferenceInformationService.initExercisesReferencesInformations();
		}, error => {
			return ExerciseReferenceInformationService.initExercisesReferencesInformations();
		})
		.then(() => {
			return ExerciseReferenceInformationService.findAll();
		})
		.then((exercisesReferencesInformations) => {
			global.exercisesReferencesInformations = exercisesReferencesInformations;
			//return GymService.findAll();
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
			)
		})
		.then(gymSaved => {
			gymSaved = gymSaved[0];
			let machine = new Machine({
				name: 'Presses à cuisse',
				workedMuscles: [
					{name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.ThighBiceps, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.EASY},
					{name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.EASY}
				]
			});
			GymService.addMachine(machine, gymSaved)
				.then(machineSaved => {
					ExerciseService.createExerciseBy('Presse à cuisse', [machineSaved], {
						weight: 60,
						type: ExerciseGroupTypeEnum.BodybuildingExercise,
						workedMuscles: [
							{name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.ThighBiceps, intensity: DifficultyEnum.MEDIUM}
						], reference: true,
						gym: gymSaved
					});
				});
			machine = new Machine({
				name: 'Banc de développé couché',
				workedMuscles: [
					{name: MuscleEnum.Pecs, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.Triceps, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.RectusAbdominus, intensity: DifficultyEnum.EASY}
				]
			});
			GymService.addMachine(machine, gymSaved)
				.then(machineSaved => {
					ExerciseService.createExerciseBy('Le développé couché', [machineSaved], {
						weight: 20,
						type: ExerciseGroupTypeEnum.BodybuildingExercise,
						workedMuscles: [
							{name: MuscleEnum.Pecs, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.MEDIUM},
							{name: MuscleEnum.Triceps, intensity: DifficultyEnum.MEDIUM}
						], reference: true, gym: gymSaved
					});
				});
			machine = new Machine({
				name: 'Pec-deck',
				workedMuscles: [
					{name: MuscleEnum.Pecs, intensity: DifficultyEnum.HARD}
				]
			});
			GymService.addMachine(machine, gymSaved)
				.then(machineSaved => {
					ExerciseService.createExerciseBy('Butterfly', [machineSaved], {
						weight: 20,
						type: ExerciseGroupTypeEnum.BodybuildingExercise,
						workedMuscles: [
							{name: MuscleEnum.Pecs, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.MEDIUM}
						],
						reference: true, gym: gymSaved
					});
				});
			machine = new Machine({
				name: 'Poulie haute',
				workedMuscles: [
					{name: MuscleEnum.LatissimusDorsi, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.Pecs, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.Biceps, intensity: DifficultyEnum.EASY},
					{name: MuscleEnum.Triceps, intensity: DifficultyEnum.EASY}
				]
			});
			GymService.addMachine(machine, gymSaved)
				.then(machineSaved => {
					ExerciseService.createExerciseBy('Extensions', [machineSaved], {
						weight: 8,
						type: ExerciseGroupTypeEnum.BodybuildingExercise,
						workedMuscles: [
							{name: MuscleEnum.Triceps, intensity: DifficultyEnum.HARD}
						], reference: true, gym: gymSaved
					});
				});
			machine = new Machine({
				name: 'Poulie basse',
				workedMuscles: [
					{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.LatissimusDorsi, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.Biceps, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.Triceps, intensity: DifficultyEnum.HARD}
				]
			});
			GymService.addMachine(machine, gymSaved)
				.then(machineSaved => {
					ExerciseService.createExerciseBy('Élévation latérale', [machineSaved], {
						weight: 10,
						type: ExerciseGroupTypeEnum.BodybuildingExercise,
						workedMuscles: [
							{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.HARD}
						], reference: true, gym: gymSaved
					});
				});
			machine = new Machine({
				name: 'Machine épaule',//todo get real name
				workedMuscles: [
					{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.HARD}
				]
			});
			GymService.addMachine(machine, gymSaved)
				.then(machineSaved => {
					ExerciseService.createExerciseBy('Élévation latérale', [machineSaved], {
						weight: 12,
						type: ExerciseGroupTypeEnum.BodybuildingExercise,
						workedMuscles: [
							{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.HARD}
						], reference: true, gym: gymSaved
					});
				});


			machine = new Machine({
				name: 'Machine biceps',//todo get real name
				workedMuscles: [
					{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.HARD}
				]
			});
			GymService.addMachine(machine, gymSaved)
				.then(machineSaved => {
					ExerciseService.createExerciseBy('Curl à la machine', [machineSaved], {
						weight: 15,
						type: ExerciseGroupTypeEnum.BodybuildingExercise,
						workedMuscles: [
							{name: MuscleEnum.Biceps, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.EASY}
						], reference: true, gym: gymSaved
					});
				});
			machine = new Machine({
				name: 'Pupitre Larry Scott',
				workedMuscles: [
					{name: MuscleEnum.Biceps, intensity: DifficultyEnum.HARD}
				]
			});
			GymService.addMachine(machine, gymSaved)
				.then(machineSaved => {
					ExerciseService.createExerciseBy('Curl', [machineSaved], {
						weight: 15,
						type: ExerciseGroupTypeEnum.BodybuildingExercise,
						workedMuscles: [
							{name: MuscleEnum.Biceps, intensity: DifficultyEnum.HARD}
						], reference: true, gym: gymSaved
					});
				});
			machine = new Machine({
				name: 'Salle abdos',
				workedMuscles: [
					{name: MuscleEnum.RectusAbdominus, intensity: DifficultyEnum.HARD}
				]
			});
			GymService.addMachine(machine, gymSaved)
				.then(machineSaved => {
					ExerciseService.createExerciseBy('Cours abdo', [machineSaved], {
						type: ExerciseGroupTypeEnum.OrganizedExercise,
						workedMuscles: [
							{name: MuscleEnum.RectusAbdominus, intensity: DifficultyEnum.HARD}
						], reference: true, gym: gymSaved
					});
				});
			machine = new Machine({
				name: 'Salle de hit',
				workedMuscles: [
					{name: MuscleEnum.RectusAbdominus, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.HARD}
				]
			});
			GymService.addMachine(machine, gymSaved)
				.then(machineSaved => {
					ExerciseService.createExerciseBy('Cours de hit', [machineSaved], {
						type: ExerciseGroupTypeEnum.OrganizedExercise,
						workedMuscles: [
							{name: MuscleEnum.RectusAbdominus, intensity: DifficultyEnum.EASY},
							{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.Lumbar, intensity: DifficultyEnum.EASY}
						], reference: true, gym: gymSaved
					});
				});
			machine = new Machine({
				name: 'Salle de trek',
				workedMuscles: [
					{name: MuscleEnum.RectusAbdominus, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.HARD}
				]
			});
			GymService.addMachine(machine, gymSaved)
				.then(machineSaved => {
					ExerciseService.createExerciseBy('Cours de trek - Récupération', [machineSaved], {
						type: ExerciseGroupTypeEnum.OrganizedExercise,
						priorityInProgramAutoGeneration: true,
						workedMuscles: [
							{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.MEDIUM}
						], reference: true, gym: gymSaved
					});
				});
			//todo see this muscles worked (Banc incliné) ...
			machine = new Machine({
				name: 'Banc incliné',
				workedMuscles: [
					{name: MuscleEnum.LatissimusDorsi, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.Pecs, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.Biceps, intensity: DifficultyEnum.EASY},
					{name: MuscleEnum.Triceps, intensity: DifficultyEnum.EASY}
				]
			});
			GymService.addMachine(machine, gymSaved)
				.then(machineSaved => {
					ExerciseService.createExerciseBy('Développé incliné avec haltères', [machineSaved], {
						weight: 20,
						type: ExerciseGroupTypeEnum.BodybuildingExercise,
						workedMuscles: [
							{name: MuscleEnum.Pecs, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.MEDIUM},
							{name: MuscleEnum.Triceps, intensity: DifficultyEnum.MEDIUM},
							{name: MuscleEnum.Biceps, intensity: DifficultyEnum.EASY}
						], reference: true, gym: gymSaved
					});
				});
			machine = new Machine({
				name: 'Bar de musculation',
				workedMuscles: [
					{name: MuscleEnum.LatissimusDorsi, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.MEDIUM}
				]
			});
			GymService.addMachine(machine, gymSaved)
				.then(machineSaved => {
					ExerciseService.createExerciseBy('Rowing barre', [machineSaved], {
						weight: 20,
						type: ExerciseGroupTypeEnum.BodybuildingExercise,
						workedMuscles: [
							{name: MuscleEnum.LatissimusDorsi, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.MEDIUM}
						], reference: true, gym: gymSaved
					});
					ExerciseService.createExerciseBy('Tirage menton', [machineSaved], {
						weight: 10,
						type: ExerciseGroupTypeEnum.BodybuildingExercise,
						workedMuscles: [
							{name: MuscleEnum.Traps, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.MEDIUM},
							{name: MuscleEnum.Biceps, intensity: DifficultyEnum.EASY}
						], reference: true, gym: gymSaved
					});
				});
			machine = new Machine({
				name: 'Bar haute',
				workedMuscles: [
					{name: MuscleEnum.LatissimusDorsi, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.MEDIUM}
				]
			});
			GymService.addMachine(machine, gymSaved)
				.then(machineSaved => {
					ExerciseService.createExerciseBy('Tirage nuque', [machineSaved], {
						weight: 20,
						type: ExerciseGroupTypeEnum.BodybuildingExercise,
						workedMuscles: [
							{name: MuscleEnum.LatissimusDorsi, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.Biceps, intensity: DifficultyEnum.MEDIUM},
							{name: MuscleEnum.Traps, intensity: DifficultyEnum.MEDIUM}
						], reference: true, gym: gymSaved
					});
				});
			machine = new Machine({
				name: 'Le sol',
				workedMuscles: []
			});
			GymService.addMachine(machine, gymSaved)
				.then(machineSaved => {
					ExerciseService.createExerciseBy('Extension lombaire couché', [machineSaved], {
						weight: 20,
						type: ExerciseGroupTypeEnum.BodybuildingExercise,
						workedMuscles: [
							{name: MuscleEnum.Lumbar, intensity: DifficultyEnum.HARD}
						], reference: true, gym: gymSaved
					});
					ExerciseService.createExerciseBy('Squat', [machineSaved], {
						weight: 20,
						type: ExerciseGroupTypeEnum.BodybuildingExercise,
						workedMuscles: [
							{name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.MEDIUM},
							{name: MuscleEnum.ThighBiceps, intensity: DifficultyEnum.MEDIUM},
							{name: MuscleEnum.RectusAbdominus, intensity: DifficultyEnum.EASY}
						], reference: true, gym: gymSaved
					});
				});
			machine = new Machine({
				name: 'Tapis de courses',
				workedMuscles: [
					{name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.GastrocnemiusLateral, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD},
				]
			});
			GymService.addMachine(machine, gymSaved)
				.then(machineSaved => {
					ExerciseService.createExerciseBy('Running', [machineSaved], {
						workedMuscles: [
							{name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.MEDIUM},
							{name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.MEDIUM},
							{name: MuscleEnum.GastrocnemiusLateral, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD},
						],
						type: ExerciseGroupTypeEnum.CardioExercise,
						reference: true,
						km: 10, gym: gymSaved
					});
				});
			machine = new Machine({
				name: 'Vélo éllyptique',
				workedMuscles: [
					{name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.GastrocnemiusLateral, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD},
				]
			});
			GymService.addMachine(machine, gymSaved)
				.then(machineSaved => {
					ExerciseService.createExerciseBy('Running fractionné', [machineSaved], {
						workedMuscles: [
							{name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.MEDIUM},
							{name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.MEDIUM},
							{name: MuscleEnum.GastrocnemiusLateral, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD},
						],
						type: ExerciseGroupTypeEnum.CardioExercise,
						priorityInProgramAutoGeneration: true,
						reference: true,
						km: 10,
						gym: gymSaved
					});
				});
			machine = new Machine({
				name: 'Vélo',
				workedMuscles: [
					{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.EASY},
					{name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.EASY}
				]
			});
			let bike = null;
			return GymService.addMachine(machine, gymSaved)
				.then(machineSaved => {
					bike = machineSaved;
					ExerciseService.createExerciseBy('Biking fractionné', [bike], {
						workedMuscles: [
							{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.MEDIUM},
							{name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.HARD}
						],
						type: ExerciseGroupTypeEnum.CardioExercise,
						priorityInProgramAutoGeneration: true,
						reference: true,
						km: 10, gym: gymSaved
					});
					return ExerciseService.createExerciseBy('Biking', [bike], {
						workedMuscles: [
							{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.MEDIUM},
							{name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.MEDIUM},
							{name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.EASY},
							{name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.EASY}
						],
						type: ExerciseGroupTypeEnum.CardioExercise,
						reference: true,
						km: 10, gym: gymSaved
					});
				}).then(() => {
					return ExerciseService.createExerciseBy('Biking', [bike], {
						workedMuscles: [
							{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD},
							{name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.MEDIUM},
							{name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.EASY},
							{name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.EASY}
						],
						type: ExerciseGroupTypeEnum.TrainingExercise,
						reference: true,
						km: 4, gym: gymSaved
					});
				})
		}).catch(error => {
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
