'use strict';

const options = {discriminatorKey: 'kind'};
const ExerciseReferenceInformation = require('./ExerciseReferenceInformation');
const ExerciseReferenceInformationEnum = require('../../_enums/ExerciseReferenceInformationEnum');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BodybuildingExerciseReferenceInformation = ExerciseReferenceInformation.discriminator(ExerciseReferenceInformationEnum.Bodybuilding.name,
  new Schema({
    repetitions: Number,
    series: Number,
    recoveryTimesBetweenEachSeries: Number,
    finalRecoveryTimes: Number,
    approximateTimeBySeries: Number
  }), options
);

module.exports.model = BodybuildingExerciseReferenceInformation;
module.exports.discriminator = ExerciseReferenceInformationEnum.Bodybuilding.name;

