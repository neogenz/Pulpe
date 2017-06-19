'use strict';

const Exercise = require('./Exercise');
const Session = require('./Session');
const mongoose = require('mongoose');
const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const Schema = mongoose.Schema;
const ProgramSchema = new Schema({
  member: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'},
  sessions: [Session.schema],
  objective: {
    type: String,
    enum: [
      ObjectiveEnum.MassGainer.name,
      ObjectiveEnum.GeneralForm.name,
      ObjectiveEnum.WeightLoss.name
    ]
  },
  isActive: {type: Boolean, default: false, required: true},
  updatedAt: Date,
  createdAt: Date
});

ProgramSchema.pre('save', function (next) {
  const currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt)
    this.createdAt = currentDate;
  next();
});

const Program = mongoose.model('Program', ProgramSchema, 'Programs');

module.exports = Program;
