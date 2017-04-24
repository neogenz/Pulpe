'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Machine = require('./Machine')
const ExerciseSchema = new Schema({
    name: String,
    machines: {type: [Machine.schema], default: []},
    updatedAt: Date,
    createdAt: Date,
});

ExerciseSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt)
        this.createdAt = currentDate;
    next();
});

const Exercise = mongoose.model('Exercise', ExerciseSchema, 'Exercises');

module.exports = Exercise;
