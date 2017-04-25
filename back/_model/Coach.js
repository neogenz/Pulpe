'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CoachSchema = new Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    updatedAt: Date,
    createdAt: Date,
    gym_id: {type: mongoose.Schema.Types.ObjectId}
});

CoachSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt)
        this.createdAt = currentDate;
    next();
});

const Coach = mongoose.model('Coach', CoachSchema, 'Coachs');

module.exports = Coach;
