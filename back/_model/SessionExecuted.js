/**
 * Created by maximedesogus on 03/07/2017.
 */
'use strict';
//todo : create enum to session state
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SessionExecutedSchema = new Schema({
  dayOfExecution: String,
  _session: {type: mongoose.Schema.Types.ObjectId, ref: 'Session'},
  _program: {type: mongoose.Schema.Types.ObjectId, ref: 'Program'},
  state: {
    type: String,
    enum: ['UNSTARTED', 'STARTED', 'IN_PROGRESS', 'DONE', 'TO_SYNCHRONIZE'],
    default: 'DONE'
  },
  updatedAt: Date,
  createdAt: Date
});

SessionExecutedSchema.pre('save', function (next) {
  const currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt)
    this.createdAt = currentDate;
  next();
});


const SessionExecuted = mongoose.model('SessionExecuted', SessionExecutedSchema, 'SessionsExecuted');

module.exports = SessionExecuted;
