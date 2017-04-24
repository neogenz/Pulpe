'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Member = require('./Member');
const Coach = require('./Coach');
const Machine = require('./Machine');
const GymSchema = new Schema({
    name: String,
    address: String,
    openingHours : Date,
    closingHours: Date,
    member: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'},
    coach: {type: mongoose.Schema.Types.ObjectId, ref: 'Coach'},
    machines: {type: [Machine.schema], default: []},
    // todo : List of accessories
    updatedAt: Date,
    createdAt: Date,
});

GymSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt)
        this.createdAt = currentDate;
    next();
});

const Gym = mongoose.model('Gym', GymSchema, 'Gyms');

module.exports = Gym;
