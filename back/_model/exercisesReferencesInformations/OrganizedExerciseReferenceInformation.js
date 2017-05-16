'use strict';

const options = {discriminatorKey: 'kind'};
const ExerciseReferenceInformation = require('./ExerciseReferenceInformation');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrganizedExerciseReferenceInformation = ExerciseReferenceInformation.discriminator('OrganizedExerciseReferenceInformation',
  new Schema({
    difficulty: String,
    approximateTime: Number
  }), options
);

module.exports = OrganizedExerciseReferenceInformation;

