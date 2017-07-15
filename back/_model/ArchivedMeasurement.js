'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MeasurementEnum = require('../_enums/MeasurementEnum');
const ArchivedMeasurementsSchema = new Schema({
    member_id: mongoose.Schema.Types.ObjectId,
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
        MeasurementEnum.Size.name
      ]
    }
    ,
    unit: {
      type: String,
      enum: ['CM', 'M', 'KG'],
      default: 'M'
    }
    ,
    value: Number,
    updatedAt: Date,
    createdAt: Date,
  })
;

// on every save, add the date
ArchivedMeasurementsSchema.pre('save', function (next) {
  const currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt)
    this.createdAt = currentDate;
  next();
});

const ArchivedMeasurement = mongoose.model('ArchivedMeasurement', ArchivedMeasurementsSchema, 'ArchivedMeasurements');

module.exports = ArchivedMeasurement;