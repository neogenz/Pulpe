'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const moment = require('moment');
moment.locale('fr');
const app = express();
const bodyParser = require('body-parser');
process.env.NODE_ENV = 'development';
const configHelper = require('./_helpers/ConfigHelper')(process.env.NODE_ENV);
const endpointConfig = require('./_config/endpoint.json')[process.env.NODE_ENV];
process.env.PORT = endpointConfig.portNumber;

// configuration ==============================================================
app.set('port', process.env.PORT || endpointConfig.portNumber);
app.use(morgan('dev'));
process.env.JWT_SECRET = 'applicationesimedpulpe';
app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Run server ==================================================================
mongoose.Promise = global.Promise;
mongoose.connect(configHelper.buildDatabaseConnectionURI());
mongoose.connection.on('connected', function () {
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

  mongoose.connection.collections['Machines'].drop().then(() => {
    return mongoose.connection.collections['Gyms'].drop();
  }, error => {
    return mongoose.connection.collections['Gyms'].drop();
  }).then(() => {
    return mongoose.connection.collections['Exercises'].drop();
  }, error => {
    return mongoose.connection.collections['Exercises'].drop();
  }).then(() => {
    return mongoose.connection.collections['ExercisesReferencesInformations'].drop();
  }, error => {
    return mongoose.connection.collections['ExercisesReferencesInformations'].drop();
  }).then(() => {
    return ExerciseReferenceInformationService.initExercisesReferencesInformations();
  }, error => {
    return ExerciseReferenceInformationService.initExercisesReferencesInformations();
  }).then(() => {
    return ExerciseReferenceInformationService.findAll();
  }).then((exercisesReferencesInformations) => {
    global.exercisesReferencesInformations = exercisesReferencesInformations;
    return GymService.createGym('Keep cool', 'Avignon',
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
  }).then(gymSaved => {
    let machine = new Machine({
      name: 'Presses à cuisse',
      workedMuscles: [
        {name: MuscleEnum.THIGH_QUADRICEPS, intensity: DifficultyEnum.HARD},
        {name: MuscleEnum.THIGH_BICEPS, intensity: DifficultyEnum.MEDIUM},
        {name: MuscleEnum.GLUTEUS_MAXIMUS, intensity: DifficultyEnum.EASY},
        {name: MuscleEnum.GLUTEUS_MEDIUS, intensity: DifficultyEnum.EASY}
      ]
    });
    GymService.addMachine(machine, gymSaved).then(machineSaved => {
      ExerciseService.createExerciseToAllObjectiveBy('Presse à cuisse', [machineSaved], {
        weight: 60,
        type: ExerciseGroupTypeEnum.BB,
        workedMuscles: [
          {name: MuscleEnum.THIGH_QUADRICEPS, intensity: DifficultyEnum.HARD},
          {name: MuscleEnum.THIGH_BICEPS, intensity: DifficultyEnum.MEDIUM}
        ]
      });
    });
    machine = new Machine({
      name: 'Banc de développé couché',
      workedMuscles: [
        {name: MuscleEnum.PECS, intensity: DifficultyEnum.HARD},
        {name: MuscleEnum.TRICEPS, intensity: DifficultyEnum.MEDIUM},
        {name: MuscleEnum.DELTOID, intensity: DifficultyEnum.MEDIUM},
        {name: MuscleEnum.RECTUS_ABDOMINIS, intensity: DifficultyEnum.EASY}
      ]
    });
    GymService.addMachine(machine, gymSaved).then(machineSaved => {
      ExerciseService.createExerciseToAllObjectiveBy('Le développé couché', [machineSaved], {
        weight: 20,
        type: ExerciseGroupTypeEnum.BB,
        workedMuscles: [
          {name: MuscleEnum.PECS, intensity: DifficultyEnum.HARD},
          {name: MuscleEnum.DELTOID, intensity: DifficultyEnum.MEDIUM},
          {name: MuscleEnum.TRICEPS, intensity: DifficultyEnum.MEDIUM}
        ]
      });
    });
    machine = new Machine({
      name: 'Pec-deck',
      workedMuscles: [
        {name: MuscleEnum.PECS, intensity: DifficultyEnum.HARD}
      ]
    });
    GymService.addMachine(machine, gymSaved).then(machineSaved => {
      ExerciseService.createExerciseToAllObjectiveBy('Butterfly', [machineSaved], {
        weight: 20,
        type: ExerciseGroupTypeEnum.BB,
        workedMuscles: [
          {name: MuscleEnum.PECS, intensity: DifficultyEnum.HARD},
          {name: MuscleEnum.DELTOID, intensity: DifficultyEnum.MEDIUM}
        ]
      });
    });
    machine = new Machine({
      name: 'Poulie haute',
      workedMuscles: [
        {name: MuscleEnum.LATISSIMUS_DORSI, intensity: DifficultyEnum.HARD},
        {name: MuscleEnum.PECS, intensity: DifficultyEnum.MEDIUM},
        {name: MuscleEnum.BICEPS, intensity: DifficultyEnum.EASY},
        {name: MuscleEnum.TRICEPS, intensity: DifficultyEnum.EASY}
      ]
    });
    GymService.addMachine(machine, gymSaved).then(machineSaved => {
      ExerciseService.createExerciseToAllObjectiveBy('Extensions', [machineSaved], {
        weight: 8,
        type: ExerciseGroupTypeEnum.BB,
        workedMuscles: [
          {name: MuscleEnum.TRICEPS, intensity: DifficultyEnum.HARD}
        ]
      });
    });
    machine = new Machine({
      name: 'Pupitre Larry Scott',
      workedMuscles: [
        {name: MuscleEnum.BICEPS, intensity: DifficultyEnum.HARD}
      ]
    });
    GymService.addMachine(machine, gymSaved).then(machineSaved => {
      ExerciseService.createExerciseToAllObjectiveBy('Curl', [machineSaved], {
        weight: 15,
        type: ExerciseGroupTypeEnum.BB,
        workedMuscles: [
          {name: MuscleEnum.BICEPS, intensity: DifficultyEnum.HARD}
        ]
      });
    });
    machine = new Machine({
      name: 'Banc incliné',
      workedMuscles: [
        {name: MuscleEnum.RECTUS_ABDOMINIS, intensity: DifficultyEnum.HARD}
      ]
    });
    GymService.addMachine(machine, gymSaved).then(machineSaved => {
      ExerciseService.createExerciseToAllObjectiveBy('Développé incliné avec haltères', [machineSaved], {
        weight: 20,
        type: ExerciseGroupTypeEnum.BB,
        workedMuscles: [
          {name: MuscleEnum.PECS, intensity: DifficultyEnum.HARD},
          {name: MuscleEnum.DELTOID, intensity: DifficultyEnum.HARD},
          {name: MuscleEnum.TRICEPS, intensity: DifficultyEnum.MEDIUM},
          {name: MuscleEnum.BICEPS, intensity: DifficultyEnum.EASY}
        ]
      });
    });
    machine = new Machine({
      name: 'Tapis de courses',
      workedMuscles: [
        {name: MuscleEnum.GLUTEUS_MEDIUS, intensity: DifficultyEnum.MEDIUM},
        {name: MuscleEnum.GLUTEUS_MAXIMUS, intensity: DifficultyEnum.MEDIUM},
        {name: MuscleEnum.GASTROCNEMIUS_LATERAL, intensity: DifficultyEnum.HARD},
        {name: MuscleEnum.CARDIO, intensity: DifficultyEnum.HARD},
      ]
    });
    GymService.addMachine(machine, gymSaved).then(machineSaved => {
      ExerciseService.createExerciseToAllObjectiveBy('Running', [machineSaved], {
        type: ExerciseGroupTypeEnum.CD
      });
    });
    machine = new Machine({
      name: 'Vélo',
      workedMuscles: [
        {name: MuscleEnum.CARDIO, intensity: DifficultyEnum.HARD},
        {name: MuscleEnum.GLUTEUS_MEDIUS, intensity: DifficultyEnum.MEDIUM},
        {name: MuscleEnum.GLUTEUS_MAXIMUS, intensity: DifficultyEnum.EASY},
        {name: MuscleEnum.THIGH_QUADRICEPS, intensity: DifficultyEnum.EASY}
      ]
    });
    return GymService.addMachine(machine, gymSaved).then(machineSaved => {
      return ExerciseService.createExerciseToAllObjectiveBy('Biking', [machineSaved], {
        type: ExerciseGroupTypeEnum.CD
      });
    });
  }).then(exerciseSaved => {
    //return SessionService.generateTrainingTo(ObjectiveEnum.MassGainer);
    return ProgramService
  }).then(session => {
    ProgramService.generateSessionsBy(3, ObjectiveEnum.MassGainer);
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
