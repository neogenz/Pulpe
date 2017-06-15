'use strict';

const Exercise = require('./Exercise');
const Session = require('./Session');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProgramSchema = new Schema({
  member: {type: [mongoose.Schema.Types.ObjectId], ref: 'Member'},
  sessions: {type: [Session.schema]},
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
