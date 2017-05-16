'use strict';

const options = {discriminatorKey: 'kind'};
const Exercise = require('./Exercise');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const discriminator = 'BodybuildingExercise';
const BodybuildingExercise = Exercise.discriminator(discriminator,
  new Schema({
    repetitions: {type: Number, required: true},
    series: {type: Number, required: true},
    weight: {type: Number, required: true},
    recoveryTimesBetweenEachSeries: {type: Number, required: true},
    finalRecoveryTimes: {type: Number, required: true},
    approximateTimeBySeries: {type: Number, required: true, default: 1.30}
  }), options
);

BodybuildingExercise.discriminatorKey = discriminator;
module.exports = BodybuildingExercise;

