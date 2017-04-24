'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProgramSchema = new Schema({
    // TODO : Merry, suce ma teub.
    updatedAt: Date,
    createdAt: Date,
});

ProgramSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt)
        this.createdAt = currentDate;
    next();
});

const Program = mongoose.model('Program', ProgramSchema, 'Programs');

module.exports = Program;
