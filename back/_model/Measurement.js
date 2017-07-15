'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MeasurementEnum = require('../_enums/MeasurementEnum');
const MeasurementSchema = new Schema({
  name: {
    type: String,
    enum: [
      MeasurementEnum.Hip.name,
      MeasurementEnum.Waist.name,
      MeasurementEnum.Chest.name,
      MeasurementEnum.Shoulders.name,
      MeasurementEnum.Basin.name,
      MeasurementEnum.RightArm.name,
      MeasurementEnum.LeftArm.name,
      MeasurementEnum.RightCalf.name,
      MeasurementEnum.LeftCalf.name,
      MeasurementEnum.LeftThigh.name,
      MeasurementEnum.RightThigh.name,
      MeasurementEnum.Weight.name,
      MeasurementEnum.Size.name,
			MeasurementEnum.Imc.name
    ]
  },
  unit: {
    type: String,
    enum: ['CM', 'M', 'KG'],
    default: 'M'
  },
  value: Number,
  updatedAt: Date,
  createdAt: Date,
});

// on every save, add the date
MeasurementSchema.pre('save', function (next) {
  const currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt)
    this.createdAt = currentDate;
  next();
});

const Measurement = mongoose.model('Measurement', MeasurementSchema, 'Measurements');

module.exports = Measurement;