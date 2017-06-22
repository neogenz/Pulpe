'use strict';

const options = {discriminatorKey: 'kind'};
const Exercise = require('./Exercise');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ExerciseGroupTypeEnum = require('../_enums/ExerciseGroupTypeEnum');
const discriminator = ExerciseGroupTypeEnum.BodybuildingExercise.name;
const BodybuildingExercise = Exercise.discriminator(discriminator,
  new Schema({
    repetitions: {type: Number},
    series: {type: Number},
    weight: {type: Number},
    recoveryTimesBetweenEachSeries: {type: Number},
    finalRecoveryTimes: {type: Number},
    approximateTimeBySeries: {type: Number, default: 1.30}
  }), options
);

BodybuildingExercise.discriminatorKey = discriminator;
module.exports = BodybuildingExercise;

