'use strict';

const options = {discriminatorKey: 'kind'};
const ExerciseReferenceInformation = require('./ExerciseReferenceInformation');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StretchingExerciseReferenceInformation = ExerciseReferenceInformation.discriminator('StretchingExerciseReferenceInformation',
  new Schema({
    time: Number
  }), options
);

module.exports = StretchingExerciseReferenceInformation;

