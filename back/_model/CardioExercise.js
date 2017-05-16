'use strict';

const options = {discriminatorKey: 'kind'};
const Exercise = require('./Exercise');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CardioExercise = Exercise.discriminator('CardioExercise',
  new Schema({
    km: Number,
    calories: Number,
    speed: Number,
    recovery: Number,
    times: [Number]
  }), options
);

module.exports = CardioExercise;