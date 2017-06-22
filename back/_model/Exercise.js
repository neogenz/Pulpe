'use strict';

const DifficultyEnum = require('../_enums/DifficultyEnum');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ExerciseSchema = new Schema({
  name: {type: String, required: true},
  machines: [{type: mongoose.Schema.Types.ObjectId, ref: 'Machine', default: []}],
  program: {type: mongoose.Schema.Types.ObjectId, ref: 'Program'},
  session: {type: mongoose.Schema.Types.ObjectId, ref: 'Session'},
  workedMuscles: [{
    intensity: {
      type: String,
      enum: [DifficultyEnum.EASY.name, DifficultyEnum.MEDIUM.name, DifficultyEnum.HARD.name],
      default: DifficultyEnum.MEDIUM.name
    },
    name: String
  }],
  reference: {type: Boolean, default: false},
  _gym: {type: mongoose.Schema.Types.ObjectId, ref: 'Gym'},
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

ExerciseSchema.query.muscleWorkedBy = function (muscle, intensity) {
  return this.find({
    'workedMuscles': {
      '$elemMatch': {
        name: muscle,
        intensity: intensity
      }
    }
  });
};

ExerciseSchema.query.onThisGymId = function (gymId) {
  return this.find({
    '_gym': gymId
  });
};

ExerciseSchema.query.isReference = function () {
  return this.find({
    'reference': true
  })
};

const Exercise = mongoose.model('Exercise', ExerciseSchema, 'Exercises');

module.exports = Exercise;
