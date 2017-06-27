'use strict';

const options = {discriminatorKey: 'kind'};
const Exercise = require('./Exercise');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ExerciseGroupTypeEnum = require('../_enums/ExerciseGroupTypeEnum');
const discriminator = ExerciseGroupTypeEnum.BodybuildingExercise.name;
const BodybuildingExercise = Exercise.discriminator(discriminator,
  new Schema({
    repetitions: {type: Number, required:true, default:0},
    series: {type: Number, required:true, default:0},
    weight: {type: Number, required:true, default:0},
    recoveryTimesBetweenEachSeries: {type: Number, required:true, default:0},
    finalRecoveryTimes: {type: Number, required:true, default:0},
    approximateTimeBySeries: {type: Number, default: 1.30, required:true}
  }), options
);

BodybuildingExercise.discriminatorKey = discriminator;
module.exports = BodybuildingExercise;

