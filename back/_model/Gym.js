'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Member = require('./Member');
const Coach = require('./Coach');
const Machine = require('./Machine');
const GymSchema = new Schema({
    name: String,
    address: String,
    city: String,
    openingDates: {
        monday: {
            openingHour: Date,
            closingHour: Date
        },
        tuesday: {
            openingHour: Date,
            closingHour: Date
        },
        wednesday: {
            openingHour: Date,
            closingHour: Date
        },
        thursday: {
            openingHour: Date,
            closingHour: Date
        },
        friday: {
            openingHour: Date,
            closingHour: Date
        },
        saturday: {
            openingHour: Date,
            closingHour: Date
        },
        sunday: {
            openingHour: Date,
            closingHour: Date
        }
    },
    //members_id: [{type: mongoose.Schema.Types.ObjectId}],
    //coachs: [{type: Coach.schema}],
    //machines_id: {type: [Machine.schema], default: []},
    // todo : List of accessories
    updatedAt: Date,
    createdAt: Date
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