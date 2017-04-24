'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ExerciseSchema = new Schema({
    name: String,
    difficultyDegree: {
        type: String,
        enum: ['LOWER', 'MEDIUM', 'HIGH'],
        default: 'MEDIUM'
    },
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
