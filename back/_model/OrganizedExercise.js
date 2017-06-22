'use strict';

const options = {discriminatorKey: 'kind'};
const Exercise = require('./Exercise');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DifficultyEnum = require('../_enums/DifficultyEnum');
const ExerciseGroupTypeEnum = require('../_enums/ExerciseGroupTypeEnum');
const discriminator = ExerciseGroupTypeEnum.OrganizedExercise.name;
const OrganizedExercise = Exercise.discriminator(discriminator,
  new Schema({
    difficulty: {
      type: String,
      enum: [
        DifficultyEnum.HARD.name,
        DifficultyEnum.MEDIUM.name,
        DifficultyEnum.EASY.name
      ]
    },
    approximateTime: Number
  }), options
);

OrganizedExercise.discriminatorKey = discriminator;
module.exports = OrganizedExercise;
