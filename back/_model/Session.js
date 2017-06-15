'use strict';
//todo : create enum to session state

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Exercise = require('./Exercise');
const SessionSchema = new Schema({
  day: Date,
  state: {
    type: String,
    enum: ['UNSTARTED', 'STARTED', 'IN_PROGRESS', 'FINISHED', 'TO_SYNCHRONIZE'],
    default: 'UNSTARTED'
  },
  exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', default: []}],
  mainMusclesGroup: {
    type: [String]
  },
  training: Boolean,
  updatedAt: Date,
  createdAt: Date
});

SessionSchema.pre('save', function (next) {
  const currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt)
    this.createdAt = currentDate;
  next();
});

const Session = mongoose.model('Session', SessionSchema, 'Sessions');

module.exports = Session;
