'use strict';

(function init() {
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const MeasurementSchema = new Schema({
        name: {
            type: String,
            enum: [
                'HIP',
                'WAIST',
                'CHEST',
                'SHOULDERS',
                'BASIN',
                'ARM_RIGHT',
                'ARM_LEFT',
                'CALF_RIGHT',
                'CALF_LEFT',
                'TIGHT_LEFT',
                'TIGHT_RIGHT'],
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
})();