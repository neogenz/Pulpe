'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const Measurement = require('./Measurement');
const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const GenderEnum = require('../_enums/GenderEnum');
const generator = require('generate-password');

const MemberSchema = new Schema({
  firstName: String,
  lastName: String,
  gender: {
    type: String,
    enum: [
      GenderEnum.Female.name,
      GenderEnum.Male.name
    ]
  },
  birthDate: Date,
  sessionFrequency: Number,
  objective: {
    type: String,
    enum: [
      ObjectiveEnum.MassGainer.name,
      ObjectiveEnum.GeneralForm.name,
      ObjectiveEnum.WeightLoss.name
    ]
  },
  measurements: {type: [Measurement.schema], default: []},
  gym: {type: mongoose.Schema.Types.ObjectId, ref: 'Gym'},
  updatedAt: Date,
  createdAt: Date,
  password: {type: String, required:true},
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

MemberSchema.methods.generateRandomPassword = function () {
  return generator.generate({
    length: 7,
    numbers: true
  });
};


const Member = mongoose.model('Member', MemberSchema, 'Members');

module.exports = Member;
