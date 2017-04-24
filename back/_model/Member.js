'use strict';

(function init() {
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const measurement = require('./Measurement');
    const AdherentSchema = new Schema({
        firstName: String,
        lastName: String,
        dateOfBirth: Date,
        updatedAt: Date,
        createdAt: Date,
    });

    // on every save, add the date
    AdherentSchema.pre('save', function (next) {
        const currentDate = new Date();
        this.updatedAt = currentDate;
        if (!this.createdAt)
            this.createdAt = currentDate;
        next();
    });

    const Adherent = mongoose.model('Adherent', AdherentSchema, 'Adherents');

    module.exports = Adherent;
})();