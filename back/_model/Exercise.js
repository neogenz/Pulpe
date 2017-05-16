'use strict';

const DifficultyEnum = require('../_enums/DifficultyEnum');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ExerciseSchema = new Schema({
  name: {type: String, required: true},
  machines: {type: [mongoose.Schema.Types.ObjectId], ref: 'Machine', default: []},
  workedMuscles: [{
    intensity: {
      type: String,
      enum: [DifficultyEnum.EASY.name, DifficultyEnum.MEDIUM.name, DifficultyEnum.HARD.name],
      default: DifficultyEnum.MEDIUM.name
    },
    name: String
  }],
  updatedAt: Date,
  createdAt: Date
});

ExerciseSchema.pre('save', function (next) {
  const currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt)
    this.createdAt = currentDate;
  next();
});

const Exercise = mongoose.model('Exercise', ExerciseSchema, 'Exercises');

module.exports = Exercise;
