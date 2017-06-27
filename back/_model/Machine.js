'use strict';

const mongoose = require('mongoose');
const DifficultyEnum = require('../_enums/DifficultyEnum');
const Schema = mongoose.Schema;
const MachineSchema = new Schema({
  name: String,
	comment: String,
  workedMuscles: [{
    intensity: {
      type: String,
      enum: [DifficultyEnum.EASY.name, DifficultyEnum.MEDIUM.name, DifficultyEnum.HARD.name],
      default: DifficultyEnum.MEDIUM.name
    },
    name: {type: String, required: true}
  }],
  gym: {type: mongoose.Schema.Types.ObjectId, ref: 'Gym'},
  updatedAt: Date,
  createdAt: Date
});

MachineSchema.pre('save', function (next) {
  const currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt)
    this.createdAt = currentDate;
  next();
});

const Machine = mongoose.model('Machine', MachineSchema, 'Machines');

module.exports = Machine;
