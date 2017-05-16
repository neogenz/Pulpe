'use strict';

const options = {discriminatorKey: 'kind'};
const ExerciseReferenceInformation = require('./ExerciseReferenceInformation');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BodybuildingExerciseReferenceInformation = ExerciseReferenceInformation.discriminator('BodybuildingExerciseReferenceInformation',
  new Schema({
    repetitions: Number,
    series: Number,
    recoveryTimesBetweenEachSeries: Number,
    finalRecoveryTimes: Number,
    approximateTimeBySeries: Number
  }), options
);

module.exports.model = BodybuildingExerciseReferenceInformation;
module.exports.discriminator = 'BodybuildingExerciseReferenceInformation';

