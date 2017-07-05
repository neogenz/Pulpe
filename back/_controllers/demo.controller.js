'use strict';

const winston = require('winston');
const ExerciseReferenceInformationsService = require('../_services/exerciseReferenceInformation.service');
const GymService = require('../_services/gym.service');
const ExerciseGroupTypeEnum = require('../_enums/ExerciseGroupTypeEnum');
const DifficultyEnum = require('../_enums/DifficultyEnum');
const MuscleEnum = require('../_enums/MuscleEnum');
const Machine = require('../_model/Machine');
const ExerciseService = require('../_services/exercise.service');

class DemoController {
    constructor() {
    }

    static async generateDemoDataOnAuthenticatedCoachGym(req, res) {
        try {
            const exercisesReferencesInformations = await ExerciseReferenceInformationsService.findAll();
            const gym = await GymService.findById(req.user.gym._id);
            let machine = new Machine({
                name: 'Presses à cuisse',
                workedMuscles: [
                    { name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.ThighBiceps, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.EASY },
                    { name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.EASY }
                ]
            });
            let machineSaved = await GymService.addMachine(machine, gym);
            await ExerciseService.createExerciseBy('Presse à cuisse', [machineSaved], {
                weight: 60,
                type: ExerciseGroupTypeEnum.BodybuildingExercise,
                workedMuscles: [
                    { name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.ThighBiceps, intensity: DifficultyEnum.MEDIUM }
                ], reference: true,
                gym: gym
            });
            machine = new Machine({
                name: 'Banc de développé couché',
                workedMuscles: [
                    { name: MuscleEnum.Pecs, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Triceps, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.Deltoid, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.RectusAbdominus, intensity: DifficultyEnum.EASY }
                ]
            });
            machineSaved = await GymService.addMachine(machine, gym);
            await ExerciseService.createExerciseBy('Le développé couché', [machineSaved], {
                weight: 20,
                type: ExerciseGroupTypeEnum.BodybuildingExercise,
                workedMuscles: [
                    { name: MuscleEnum.Pecs, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Deltoid, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.Triceps, intensity: DifficultyEnum.MEDIUM }
                ], reference: true, gym: gym
            });
            machine = new Machine({
                name: 'Pec-deck',
                workedMuscles: [
                    { name: MuscleEnum.Pecs, intensity: DifficultyEnum.HARD }
                ]
            });
            machineSaved = await GymService.addMachine(machine, gym);
            await ExerciseService.createExerciseBy('Butterfly', [machineSaved], {
                weight: 20,
                type: ExerciseGroupTypeEnum.BodybuildingExercise,
                workedMuscles: [
                    { name: MuscleEnum.Pecs, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Deltoid, intensity: DifficultyEnum.MEDIUM }
                ],
                reference: true, gym: gym
            });

            machine = new Machine({
                name: 'Poulie haute',
                workedMuscles: [
                    { name: MuscleEnum.LatissimusDorsi, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Pecs, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.Biceps, intensity: DifficultyEnum.EASY },
                    { name: MuscleEnum.Triceps, intensity: DifficultyEnum.EASY }
                ]
            });
            machineSaved = await GymService.addMachine(machine, gym);
            await ExerciseService.createExerciseBy('Extensions', [machineSaved], {
                weight: 8,
                type: ExerciseGroupTypeEnum.BodybuildingExercise,
                workedMuscles: [
                    { name: MuscleEnum.Triceps, intensity: DifficultyEnum.HARD }
                ], reference: true, gym: gym
            });

            machine = new Machine({
                name: 'Poulie basse',
                workedMuscles: [
                    { name: MuscleEnum.Deltoid, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.LatissimusDorsi, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Biceps, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Triceps, intensity: DifficultyEnum.HARD }
                ]
            });
            machineSaved = await GymService.addMachine(machine, gym);
            await ExerciseService.createExerciseBy('Élévation latérale', [machineSaved], {
                weight: 10,
                type: ExerciseGroupTypeEnum.BodybuildingExercise,
                workedMuscles: [
                    { name: MuscleEnum.Deltoid, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.HARD }
                ], reference: true, gym: gym
            });

            machine = new Machine({
                name: 'Machine épaule',//todo get real name
                workedMuscles: [
                    { name: MuscleEnum.Deltoid, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.HARD }
                ]
            });
            machineSaved = await GymService.addMachine(machine, gym);
            await ExerciseService.createExerciseBy('Élévation latérale', [machineSaved], {
                weight: 12,
                type: ExerciseGroupTypeEnum.BodybuildingExercise,
                workedMuscles: [
                    { name: MuscleEnum.Deltoid, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.HARD }
                ], reference: true, gym: gym
            });



            machine = new Machine({
                name: 'Machine biceps',//todo get real name
                workedMuscles: [
                    { name: MuscleEnum.Deltoid, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.HARD }
                ]
            });
            machineSaved = await GymService.addMachine(machine, gym);
            await ExerciseService.createExerciseBy('Curl à la machine', [machineSaved], {
                weight: 15,
                type: ExerciseGroupTypeEnum.BodybuildingExercise,
                workedMuscles: [
                    { name: MuscleEnum.Biceps, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Deltoid, intensity: DifficultyEnum.EASY }
                ], reference: true, gym: gym
            });

            machine = new Machine({
                name: 'Pupitre Larry Scott',
                workedMuscles: [
                    { name: MuscleEnum.Biceps, intensity: DifficultyEnum.HARD }
                ]
            });
            machineSaved = await GymService.addMachine(machine, gym);
            await ExerciseService.createExerciseBy('Curl', [machineSaved], {
                weight: 15,
                type: ExerciseGroupTypeEnum.BodybuildingExercise,
                workedMuscles: [
                    { name: MuscleEnum.Biceps, intensity: DifficultyEnum.HARD }
                ], reference: true, gym: gym
            });

            machine = new Machine({
                name: 'Salle abdos',
                workedMuscles: [
                    { name: MuscleEnum.RectusAbdominus, intensity: DifficultyEnum.HARD }
                ]
            });
            machineSaved = await GymService.addMachine(machine, gym);
            await ExerciseService.createExerciseBy('Cours abdo', [machineSaved], {
                type: ExerciseGroupTypeEnum.OrganizedExercise,
                workedMuscles: [
                    { name: MuscleEnum.RectusAbdominus, intensity: DifficultyEnum.HARD }
                ], reference: true, gym: gym
            });

            machine = new Machine({
                name: 'Salle de hit',
                workedMuscles: [
                    { name: MuscleEnum.RectusAbdominus, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.HARD }
                ]
            });
            machineSaved = await GymService.addMachine(machine, gym);
            await ExerciseService.createExerciseBy('Cours de hit', [machineSaved], {
                type: ExerciseGroupTypeEnum.OrganizedExercise,
                workedMuscles: [
                    { name: MuscleEnum.RectusAbdominus, intensity: DifficultyEnum.EASY },
                    { name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Lumbar, intensity: DifficultyEnum.EASY }
                ], reference: true, gym: gym
            });

            machine = new Machine({
                name: 'Salle de trek',
                workedMuscles: [
                    { name: MuscleEnum.RectusAbdominus, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.HARD }
                ]
            });
            machineSaved = await GymService.addMachine(machine, gym);
            await ExerciseService.createExerciseBy('Cours de trek - Récupération', [machineSaved], {
                type: ExerciseGroupTypeEnum.OrganizedExercise,
                priorityInProgramAutoGeneration: true,
                workedMuscles: [
                    { name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.MEDIUM }
                ], reference: true, gym: gym
            });

            //todo see this muscles worked (Banc incliné) ...
            machine = new Machine({
                name: 'Banc incliné',
                workedMuscles: [
                    { name: MuscleEnum.LatissimusDorsi, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Pecs, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.Biceps, intensity: DifficultyEnum.EASY },
                    { name: MuscleEnum.Triceps, intensity: DifficultyEnum.EASY }
                ]
            });
            machineSaved = await GymService.addMachine(machine, gym);
            await ExerciseService.createExerciseBy('Développé incliné avec haltères', [machineSaved], {
                weight: 20,
                type: ExerciseGroupTypeEnum.BodybuildingExercise,
                workedMuscles: [
                    { name: MuscleEnum.Pecs, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Deltoid, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.Triceps, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.Biceps, intensity: DifficultyEnum.EASY }
                ], reference: true, gym: gym
            });

            machine = new Machine({
                name: 'Bar de musculation',
                workedMuscles: [
                    { name: MuscleEnum.LatissimusDorsi, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.MEDIUM }
                ]
            });
            machineSaved = await GymService.addMachine(machine, gym);
            await ExerciseService.createExerciseBy('Rowing barre', [machineSaved], {
                weight: 20,
                type: ExerciseGroupTypeEnum.BodybuildingExercise,
                workedMuscles: [
                    { name: MuscleEnum.LatissimusDorsi, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.MEDIUM }
                ], reference: true, gym: gym
            });
            await ExerciseService.createExerciseBy('Tirage menton', [machineSaved], {
                weight: 10,
                type: ExerciseGroupTypeEnum.BodybuildingExercise,
                workedMuscles: [
                    { name: MuscleEnum.Traps, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Deltoid, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.Biceps, intensity: DifficultyEnum.EASY }
                ], reference: true, gym: gym
            });

            machine = new Machine({
                name: 'Bar haute',
                workedMuscles: [
                    { name: MuscleEnum.LatissimusDorsi, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.PosteriorDeltoid, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.Deltoid, intensity: DifficultyEnum.MEDIUM }
                ]
            });
            machineSaved = await GymService.addMachine(machine, gym);
            await ExerciseService.createExerciseBy('Tirage nuque', [machineSaved], {
                weight: 20,
                type: ExerciseGroupTypeEnum.BodybuildingExercise,
                workedMuscles: [
                    { name: MuscleEnum.LatissimusDorsi, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Biceps, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.Traps, intensity: DifficultyEnum.MEDIUM }
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
                    { name: MuscleEnum.Lumbar, intensity: DifficultyEnum.HARD }
                ], reference: true, gym: gym
            });
            await ExerciseService.createExerciseBy('Squat', [machineSaved], {
                weight: 20,
                type: ExerciseGroupTypeEnum.BodybuildingExercise,
                workedMuscles: [
                    { name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.ThighBiceps, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.RectusAbdominus, intensity: DifficultyEnum.EASY }
                ], reference: true, gym: gym
            });

            machine = new Machine({
                name: 'Tapis de courses',
                workedMuscles: [
                    { name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.GastrocnemiusLateral, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD },
                ]
            });
            machineSaved = await GymService.addMachine(machine, gym);
            await ExerciseService.createExerciseBy('Running', [machineSaved], {
                workedMuscles: [
                    { name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.GastrocnemiusLateral, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD },
                ],
                type: ExerciseGroupTypeEnum.CardioExercise,
                reference: true,
                km: 10, gym: gym
            });

            machine = new Machine({
                name: 'Vélo éllyptique',
                workedMuscles: [
                    { name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.GastrocnemiusLateral, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD },
                ]
            });
            machineSaved = await GymService.addMachine(machine, gym);
            await ExerciseService.createExerciseBy('Running fractionné', [machineSaved], {
                workedMuscles: [
                    { name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.GastrocnemiusLateral, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD },
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
                    { name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.EASY },
                    { name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.EASY }
                ]
            });
            let bike = null;
            machineSaved = await GymService.addMachine(machine, gym);
            bike = machineSaved;
            await ExerciseService.createExerciseBy('Biking fractionné', [bike], {
                workedMuscles: [
                    { name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.HARD }
                ],
                type: ExerciseGroupTypeEnum.CardioExercise,
                priorityInProgramAutoGeneration: true,
                reference: true,
                km: 10, gym: gym
            });
            await ExerciseService.createExerciseBy('Biking', [bike], {
                workedMuscles: [
                    { name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.EASY },
                    { name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.EASY }
                ],
                type: ExerciseGroupTypeEnum.CardioExercise,
                reference: true,
                km: 10, gym: gym
            });

            await ExerciseService.createExerciseBy('Biking', [bike], {
                workedMuscles: [
                    { name: MuscleEnum.Cardiovascular, intensity: DifficultyEnum.HARD },
                    { name: MuscleEnum.GluteusMedius, intensity: DifficultyEnum.MEDIUM },
                    { name: MuscleEnum.GluteusMaximus, intensity: DifficultyEnum.EASY },
                    { name: MuscleEnum.ThighQuadriceps, intensity: DifficultyEnum.EASY }
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