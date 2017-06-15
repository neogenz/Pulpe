'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ArchivedMeasurementsSchema = new Schema({
        member_id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String,
            enum: [
                'HIP',
                'WAIST',
                'CHEST',
                'SHOULDERS',
                'BASIN',
                'RIGHT_ARM',
                'LEFT_ARM',
                'RIGHT_CALF',
                'LEFT_CALF',
                'THIGH_LEFT',
                'THIGH_RIGHT',
                'WEIGHT',
                'SIZE'
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