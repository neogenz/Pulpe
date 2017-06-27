'use strict';

const options = {discriminatorKey: 'kind'};
const Exercise = require('./Exercise');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CardioExercise = Exercise.discriminator('CardioExercise',
  new Schema({
    km: {type: Number, required: true, default:0},
    calories: {type: Number, required: true, default:0},
    speed: {type: Number, required: true, default:0},
    recovery: {type: Number, required: true, default:0},
    times: {type: [Number], required: true, default:[0]}
  }), options
);

module.exports = CardioExercise;