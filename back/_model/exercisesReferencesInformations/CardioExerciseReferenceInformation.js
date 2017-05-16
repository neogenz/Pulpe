'use strict';

const options = {discriminatorKey: 'kind'};
const ExerciseReferenceInformation = require('./ExerciseReferenceInformation');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const discriminator = 'CardioExerciseReferenceInformation';
const CardioExerciseReferenceInformation = ExerciseReferenceInformation.discriminator(discriminator,
  new Schema({
    km: Number,
    calories: Number,
    speed: Number,
    recovery: Number,
    times: [Number]
  }), options
);

CardioExerciseReferenceInformation.discriminatorKey = discriminator;

module.exports = CardioExerciseReferenceInformation;

