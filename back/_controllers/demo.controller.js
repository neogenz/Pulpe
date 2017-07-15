'use strict';

const winston = require('winston');
const ExerciseReferenceInformationsService = require('../_services/exerciseReferenceInformation.service');
const GymService = require('../_services/gym.service');
const ExerciseGroupTypeEnum = require('../_enums/ExerciseGroupTypeEnum');
const DifficultyEnum = require('../_enums/DifficultyEnum');
const MuscleEnum = require('../_enums/MuscleEnum');
const Machine = require('../_model/Machine');
const Measurement = require('../_model/Measurement');
const ArchivedMeasurement = require('../_model/ArchivedMeasurement');
const ExerciseService = require('../_services/exercise.service');
const MeasurementService = require('../_services/measurement.service');
const MemberService = require('../_services/member.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const MeasurementEnum = require('../_enums/MeasurementEnum');
const moment = require('moment');

class DemoController {
	constructor() {
	}

	// 180cm 65 KG
	static async generateDemoDataOnAuthenticatedMember(req, res) {
		const memberId = req.user._id;
		const member = await MemberService.findById(memberId);

		const archivedMeasurements = getArchivedMeasurements(memberId);
		const measurements = getMeasurements(member);

		await MemberService.addMeasurementsWithIMC(memberId, measurements);
		await MeasurementService.deleteArchivedMeasurements(memberId);
		await MeasurementService.createArchivedMeasurements(memberId, archivedMeasurements);
		return res.send({});
	}

	static async generateDemoDataOnAuthenticatedCoachGym(req, res) {
		try {
			const exercisesReferencesInformations = await ExerciseReferenceInformationsService.findAll();
			const gym = await GymService.findById(req.user.gym._id);
			let machine = new Machine({
				name: 'Presses à cuisse',
				workedMuscles: [
					{name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.ThighBiceps, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.EASY},
					{name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.EASY}
				]
			});
			let machineSaved = await GymService.addMachine(machine, gym);
			await ExerciseService.createExerciseBy('Presse à cuisse', [machineSaved], {
				weight: 60,
				type: ExerciseGroupTypeEnum.BodybuildingExercise,
				workedMuscles: [
					{name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.ThighBiceps, intensity: DifficultyEnum.MEDIUM}
				], reference: true,
				gym: gym
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
			machineSaved = await GymService.addMachine(machine, gym);
			await ExerciseService.createExerciseBy('Le développé couché', [machineSaved], {
				weight: 20,
				type: ExerciseGroupTypeEnum.BodybuildingExercise,
				workedMuscles: [
					{name: MuscleEnum.Pecs, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.Triceps, intensity: DifficultyEnum.MEDIUM}
				], reference: true, gym: gym
			});
			machine = new Machine({
				name: 'Pec-deck',
				workedMuscles: [
					{name: MuscleEnum.Pecs, intensity: DifficultyEnum.HARD}
				]
			});
			machineSaved = await GymService.addMachine(machine, gym);
			await ExerciseService.createExerciseBy('Butterfly', [machineSaved], {
				weight: 20,
				type: ExerciseGroupTypeEnum.BodybuildingExercise,
				workedMuscles: [
					{name: MuscleEnum.Pecs, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.MEDIUM}
				],
				reference: true, gym: gym
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
			machineSaved = await GymService.addMachine(machine, gym);
			await ExerciseService.createExerciseBy('Extensions', [machineSaved], {
				weight: 8,
				type: ExerciseGroupTypeEnum.BodybuildingExercise,
				workedMuscles: [
					{name: MuscleEnum.Triceps, intensity: DifficultyEnum.HARD}
				], reference: true, gym: gym
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
			machineSaved = await GymService.addMachine(machine, gym);
			await ExerciseService.createExerciseBy('Élévation latérale', [machineSaved], {
				weight: 10,
				type: ExerciseGroupTypeEnum.BodybuildingExercise,
				workedMuscles: [
					{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.HARD}
				], reference: true, gym: gym
			});

			machine = new Machine({
				name: 'Machine épaule',//todo get real name
				workedMuscles: [
					{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.HARD}
				]
			});
			machineSaved = await GymService.addMachine(machine, gym);
			await ExerciseService.createExerciseBy('Élévation latérale', [machineSaved], {
				weight: 12,
				type: ExerciseGroupTypeEnum.BodybuildingExercise,
				workedMuscles: [
					{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.HARD}
				], reference: true, gym: gym
			});


			machine = new Machine({
				name: 'Machine biceps',//todo get real name
				workedMuscles: [
					{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.HARD}
				]
			});
			machineSaved = await GymService.addMachine(machine, gym);
			await ExerciseService.createExerciseBy('Curl à la machine', [machineSaved], {
				weight: 15,
				type: ExerciseGroupTypeEnum.BodybuildingExercise,
				workedMuscles: [
					{name: MuscleEnum.Biceps, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.EASY}
				], reference: true, gym: gym
			});

			machine = new Machine({
				name: 'Pupitre Larry Scott',
				workedMuscles: [
					{name: MuscleEnum.Biceps, intensity: DifficultyEnum.HARD}
				]
			});
			machineSaved = await GymService.addMachine(machine, gym);
			await ExerciseService.createExerciseBy('Curl', [machineSaved], {
				weight: 15,
				type: ExerciseGroupTypeEnum.BodybuildingExercise,
				workedMuscles: [
					{name: MuscleEnum.Biceps, intensity: DifficultyEnum.HARD}
				], reference: true, gym: gym
			});

			machine = new Machine({
				name: 'Salle abdos',
				workedMuscles: [
					{name: MuscleEnum.RectusAbdominus, intensity: DifficultyEnum.HARD}
				]
			});
			machineSaved = await GymService.addMachine(machine, gym);
			await ExerciseService.createExerciseBy('Cours abdo', [machineSaved], {
				type: ExerciseGroupTypeEnum.OrganizedExercise,
				workedMuscles: [
					{name: MuscleEnum.RectusAbdominus, intensity: DifficultyEnum.HARD}
				], reference: true, gym: gym
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
			machineSaved = await GymService.addMachine(machine, gym);
			await ExerciseService.createExerciseBy('Cours de hit', [machineSaved], {
				type: ExerciseGroupTypeEnum.OrganizedExercise,
				workedMuscles: [
					{name: MuscleEnum.RectusAbdominus, intensity: DifficultyEnum.EASY},
					{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.Lumbar, intensity: DifficultyEnum.EASY}
				], reference: true, gym: gym
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
			machineSaved = await GymService.addMachine(machine, gym);
			await ExerciseService.createExerciseBy('Cours de trek - Récupération', [machineSaved], {
				type: ExerciseGroupTypeEnum.OrganizedExercise,
				priorityInProgramAutoGeneration: true,
				workedMuscles: [
					{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.MEDIUM}
				], reference: true, gym: gym
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
			machineSaved = await GymService.addMachine(machine, gym);
			await ExerciseService.createExerciseBy('Développé incliné avec haltères', [machineSaved], {
				weight: 20,
				type: ExerciseGroupTypeEnum.BodybuildingExercise,
				workedMuscles: [
					{name: MuscleEnum.Pecs, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.Triceps, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.Biceps, intensity: DifficultyEnum.EASY}
				], reference: true, gym: gym
			});

			machine = new Machine({
				name: 'Bar de musculation',
				workedMuscles: [
					{name: MuscleEnum.LatissimusDorsi, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.MEDIUM}
				]
			});
			machineSaved = await GymService.addMachine(machine, gym);
			await ExerciseService.createExerciseBy('Rowing barre', [machineSaved], {
				weight: 20,
				type: ExerciseGroupTypeEnum.BodybuildingExercise,
				workedMuscles: [
					{name: MuscleEnum.LatissimusDorsi, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.MEDIUM}
				], reference: true, gym: gym
			});
			await ExerciseService.createExerciseBy('Tirage menton', [machineSaved], {
				weight: 10,
				type: ExerciseGroupTypeEnum.BodybuildingExercise,
				workedMuscles: [
					{name: MuscleEnum.Traps, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.Biceps, intensity: DifficultyEnum.EASY}
				], reference: true, gym: gym
			});

			machine = new Machine({
				name: 'Bar haute',
				workedMuscles: [
					{name: MuscleEnum.LatissimusDorsi, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.Deltoid, intensity: DifficultyEnum.MEDIUM}
				]
			});
			machineSaved = await GymService.addMachine(machine, gym);
			await ExerciseService.createExerciseBy('Tirage nuque', [machineSaved], {
				weight: 20,
				type: ExerciseGroupTypeEnum.BodybuildingExercise,
				workedMuscles: [
					{name: MuscleEnum.LatissimusDorsi, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.Biceps, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.Traps, intensity: DifficultyEnum.MEDIUM}
				], reference: true, gym: gym
			});

			machine = new Machine({
				name: 'Le sol',
				workedMuscles: []
			});
			machineSaved = await GymService.addMachine(machine, gym);
			await ExerciseService.createExerciseBy('Extension lombaire couché', [machineSaved], {
				weight: 20,
				type: ExerciseGroupTypeEnum.BodybuildingExercise,
				workedMuscles: [
					{name: MuscleEnum.Lumbar, intensity: DifficultyEnum.HARD}
				], reference: true, gym: gym
			});
			await ExerciseService.createExerciseBy('Squat', [machineSaved], {
				weight: 20,
				type: ExerciseGroupTypeEnum.BodybuildingExercise,
				workedMuscles: [
					{name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.ThighBiceps, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.RectusAbdominus, intensity: DifficultyEnum.EASY}
				], reference: true, gym: gym
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
			machineSaved = await GymService.addMachine(machine, gym);
			await ExerciseService.createExerciseBy('Running', [machineSaved], {
				workedMuscles: [
					{name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.GastrocnemiusLateral, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD},
				],
				type: ExerciseGroupTypeEnum.CardioExercise,
				reference: true,
				km: 10, gym: gym
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
			machineSaved = await GymService.addMachine(machine, gym);
			await ExerciseService.createExerciseBy('Running fractionné', [machineSaved], {
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
				gym: gym
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
			machineSaved = await GymService.addMachine(machine, gym);
			bike = machineSaved;
			await ExerciseService.createExerciseBy('Biking fractionné', [bike], {
				workedMuscles: [
					{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.HARD}
				],
				type: ExerciseGroupTypeEnum.CardioExercise,
				priorityInProgramAutoGeneration: true,
				reference: true,
				km: 10, gym: gym
			});
			await ExerciseService.createExerciseBy('Biking', [bike], {
				workedMuscles: [
					{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.EASY},
					{name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.EASY}
				],
				type: ExerciseGroupTypeEnum.CardioExercise,
				reference: true,
				km: 10, gym: gym
			});

			await ExerciseService.createExerciseBy('Biking', [bike], {
				workedMuscles: [
					{name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD},
					{name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.MEDIUM},
					{name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.EASY},
					{name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.EASY}
				],
				type: ExerciseGroupTypeEnum.TrainingExercise,
				reference: true,
				km: 4, gym: gym
			});
			return res.send({});
		} catch (error) {
			winston.log('error', error.stack);
			const httpError = HttpErrorHelper.buildHttpErrorByError(error);
			return res.status(httpError.code).send(httpError);
		}
	}
}

module.exports = DemoController;

function getMeasurements(member) {
	const measurements = [];
	let date = moment(new Date()).subtract(1, 'months');

	measurements.push(createMeasurement(
		member._id,
		'KG',
		76,
		MeasurementEnum.getName(MeasurementEnum.Weight),
		date
	));

	measurements.push(createMeasurement(
		member._id,
		'CM',
		58,
		MeasurementEnum.getName(MeasurementEnum.Waist),
		date
	));

	measurements.push(createMeasurement(
		member._id,
		'CM',
		58,
		MeasurementEnum.getName(MeasurementEnum.Hip),
		date
	));

	measurements.push(createMeasurement(
		member._id,
		'CM',
		58,
		MeasurementEnum.getName(MeasurementEnum.Shoulders),
		date
	));

	measurements.push(createMeasurement(
		member._id,
		'CM',
		58,
		MeasurementEnum.getName(MeasurementEnum.RightThigh),
		date
	));

	measurements.push(createMeasurement(
		member._id,
		'CM',
		58,
		MeasurementEnum.getName(MeasurementEnum.LeftThigh),
		date
	));

	measurements.push(createMeasurement(
		member._id,
		'CM',
		58,
		MeasurementEnum.getName(MeasurementEnum.RightCalf),
		date
	));

	measurements.push(createMeasurement(
		member._id,
		'CM',
		58,
		MeasurementEnum.getName(MeasurementEnum.LeftCalf),
		date
	));

	measurements.push(createMeasurement(
		member._id,
		'CM',
		58,
		MeasurementEnum.getName(MeasurementEnum.LeftArm),
		date
	));

	measurements.push(createMeasurement(
		member._id,
		'CM',
		58,
		MeasurementEnum.getName(MeasurementEnum.RightArm),
		date
	));

	measurements.push(createMeasurement(
		member._id,
		'CM',
		58,
		MeasurementEnum.getName(MeasurementEnum.Chest),
		date
	));

	measurements.push(createMeasurement(
		member._id,
		'CM',
		180,
		MeasurementEnum.getName(MeasurementEnum.Size),
		date
	));

	const imcMeasurement = MeasurementService.findMeasurementIn(member.measurements, MeasurementEnum.Imc);
	measurements.push(createMeasurement(
		member._id,
		'M',
		imcMeasurement.value,
		MeasurementEnum.getName(MeasurementEnum.Imc),
		moment(imcMeasurement.createdAt).subtract(1, 'years')
	));

	return measurements;
}

function getArchivedMeasurements(memberId) {
	const archivedMeasurements = [];

	let date = moment(new Date()).subtract(1, 'years');
	let weight = 65;
	for (let i = 0; i < 11; i++) {
		archivedMeasurements.push(createArchivedMeasurement(
			memberId,
			'KG',
			weight,
			MeasurementEnum.getName(MeasurementEnum.Weight),
			date
		));
		weight += 1;
		date = moment(date).add(1, 'M').toDate();
	}

	date = moment(new Date()).subtract(1, 'years');
	let rand;
	for (let i = 0; i < 11; i++) {
		rand = Math.floor(Math.random() * 5) + 50;
		archivedMeasurements.push(createArchivedMeasurement(
			memberId,
			'CM',
			rand,
			MeasurementEnum.getName(MeasurementEnum.Chest),
			date
		));
		date = moment(date).add(1, 'M').toDate();
	}

	date = moment(new Date()).subtract(1, 'years');
	for (let i = 0; i < 11; i++) {
		rand = Math.floor(Math.random() * 5) + 50;
		archivedMeasurements.push(createArchivedMeasurement(
			memberId,
			'CM',
			rand,
			MeasurementEnum.getName(MeasurementEnum.Hip),
			date
		));
		date = moment(date).add(1, 'M').toDate();
	}

	date = moment(new Date()).subtract(1, 'years');
	for (let i = 0; i < 11; i++) {
		rand = Math.floor(Math.random() * 5) + 50;
		archivedMeasurements.push(createArchivedMeasurement(
			memberId,
			'CM',
			rand,
			MeasurementEnum.getName(MeasurementEnum.LeftArm),
			date
		));
		date = moment(date).add(1, 'M').toDate();
	}

	date = moment(new Date()).subtract(1, 'years');
	for (let i = 0; i < 11; i++) {
		rand = Math.floor(Math.random() * 5) + 50;
		archivedMeasurements.push(createArchivedMeasurement(
			memberId,
			'CM',
			rand,
			MeasurementEnum.getName(MeasurementEnum.RightArm),
			date
		));
		date = moment(date).add(1, 'M').toDate();
	}

	date = moment(new Date()).subtract(1, 'years');
	for (let i = 0; i < 11; i++) {
		rand = Math.floor(Math.random() * 5) + 50;
		archivedMeasurements.push(createArchivedMeasurement(
			memberId,
			'CM',
			rand,
			MeasurementEnum.getName(MeasurementEnum.LeftCalf),
			date
		));
		date = moment(date).add(1, 'M').toDate();
	}

	date = moment(new Date()).subtract(1, 'years');
	for (let i = 0; i < 11; i++) {
		rand = Math.floor(Math.random() * 5) + 50;
		archivedMeasurements.push(createArchivedMeasurement(
			memberId,
			'CM',
			rand,
			MeasurementEnum.getName(MeasurementEnum.RightCalf),
			date
		));
		date = moment(date).add(1, 'M').toDate();
	}

	date = moment(new Date()).subtract(1, 'years');
	for (let i = 0; i < 11; i++) {
		rand = Math.floor(Math.random() * 5) + 50;
		archivedMeasurements.push(createArchivedMeasurement(
			memberId,
			'CM',
			rand,
			MeasurementEnum.getName(MeasurementEnum.LeftThigh),
			date
		));
		date = moment(date).add(1, 'M').toDate();
	}

	date = moment(new Date()).subtract(1, 'years');
	for (let i = 0; i < 11; i++) {
		rand = Math.floor(Math.random() * 5) + 50;
		archivedMeasurements.push(createArchivedMeasurement(
			memberId,
			'CM',
			rand,
			MeasurementEnum.getName(MeasurementEnum.RightThigh),
			date
		));
		date = moment(date).add(1, 'M').toDate();
	}

	date = moment(new Date()).subtract(1, 'years');
	for (let i = 0; i < 11; i++) {
		rand = Math.floor(Math.random() * 5) + 50;
		archivedMeasurements.push(createArchivedMeasurement(
			memberId,
			'CM',
			rand,
			MeasurementEnum.getName(MeasurementEnum.Shoulders),
			date
		));
		date = moment(date).add(1, 'M').toDate();
	}

	date = moment(new Date()).subtract(1, 'years');
	for (let i = 0; i < 11; i++) {
		rand = Math.floor(Math.random() * 5) + 50;
		archivedMeasurements.push(createArchivedMeasurement(
			memberId,
			'CM',
			rand,
			MeasurementEnum.getName(MeasurementEnum.Waist),
			date
		));
		date = moment(date).add(1, 'M').toDate();
	}

	date = moment(new Date()).subtract(1, 'years');
	for (let i = 0; i < 11; i++) {
		archivedMeasurements.push(createArchivedMeasurement(
			memberId,
			'CM',
			180,
			MeasurementEnum.getName(MeasurementEnum.Size),
			date
		));
		date = moment(date).add(1, 'M').toDate();
	}
	return archivedMeasurements;
}

function createArchivedMeasurement(memberId, unit, value, name, date) {
	return new ArchivedMeasurement({
		name: name,
		member_id: memberId,
		unit: unit,
		value: value,
		createdAt: date
	});
}

function createMeasurement(memberId, unit, value, name, date) {
	return new Measurement({
		name: name,
		member_id: memberId,
		unit: unit,
		value: value,
		createdAt: date
	});
}
