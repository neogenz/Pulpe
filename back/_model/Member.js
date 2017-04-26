'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const Measurement = require('./Measurement');
const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const MemberSchema = new Schema({
  firstName: String,
  lastName: String,
  birthDate: Date,
  sessionFrequency: Number,
  objective: {
    type: String,
    enum: [
      ObjectiveEnum.MG.name,
      ObjectiveEnum.GF.name,
      ObjectiveEnum.WL.name
    ]
  },
  measurements: {type: [Measurement.schema], default: []},
  gym_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Gym'},
  updatedAt: Date,
  createdAt: Date,
  password: String,
  profileCompleted: {type: Boolean, default: false},
  email: {
    type: String,
    unique: true,
    required: true
  }
});

MemberSchema.pre('save', function (next) {
  const currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt)
    this.createdAt = currentDate;
  next();
});

MemberSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

MemberSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};


const Member = mongoose.model('Member', MemberSchema, 'Members');

module.exports = Member;
