'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Measurement = require('./Measurement');
const MemberSchema = new Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    measurements: {type: [Measurement.schema], default: []},
    updatedAt: Date,
    createdAt: Date,
});

MemberSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt)
        this.createdAt = currentDate;
    next();
});

const Member = mongoose.model('Member', MemberSchema, 'Members');

module.exports = Member;
