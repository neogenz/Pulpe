'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Member = require('./Adherent');
const Coach = require('./Coach');
const Machine = require('./Machine');
// todo : List of accessories
const AdherentSchema = new Schema({
    name: String,
    address: String,
    openingHours : Date,
    closingHours: Date,
    member: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'},
    coach: {type: mongoose.Schema.Types.ObjectId, ref: 'Coach'},
    machines: {type: [Machine.schema], default: []},
    updatedAt: Date,
    createdAt: Date,
});

AdherentSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt)
        this.createdAt = currentDate;
    next();
});

const Adherent = mongoose.model('Adherent', AdherentSchema, 'Adherents');

module.exports = Adherent;
