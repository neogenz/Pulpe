'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MachineSchema = new Schema({
  name: String,
  difficultyDegree: {
    type: String,
    enum: ['LOWER', 'MEDIUM', 'HIGH'],
    default: 'MEDIUM'
  },
  gym_id: {type: mongoose.Schema.Types.ObjectId, ref:'Gym'},
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
