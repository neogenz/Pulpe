'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ExerciseReferenceInformationEnum = require('../../_enums/ExerciseReferenceInformationEnum');
const ExerciseReferenceInformationSchema = new Schema({
  phase: Number,
  objective: String,
  updatedAt: Date,
  createdAt: Date,
  machines: [{type: mongoose.Schema.Types.ObjectId, ref: 'Machine', default: []}]
});

ExerciseReferenceInformationSchema.pre('save', function (next) {
  const currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt)
    this.createdAt = currentDate;
  next();
});

/**
 * @param {number} [phase=1]
 * @returns {boolean}
 */
ExerciseReferenceInformationSchema.methods.isBodyBuildingTypeOfPhase = function (phase = 1) {
  return (this.__t === ExerciseReferenceInformationEnum.Bodybuilding.name && this.phase === phase);
};

/**
 * @param {number} [phase=1]
 * @returns {boolean}
 */
ExerciseReferenceInformationSchema.methods.isCardioTypeOfPhase = function (phase = 1) {
  return (this.__t === ExerciseReferenceInformationEnum.Cardio.name && this.phase === phase);
};

const ExerciseReferenceInformation = mongoose.model('ExerciseReferenceInformation', ExerciseReferenceInformationSchema, 'ExercisesReferencesInformations');

module.exports = ExerciseReferenceInformation;
