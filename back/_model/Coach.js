'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const GenderEnum = require('../_enums/GenderEnum');

const CoachSchema = new Schema({
	firstName: String,
	lastName: String,
	gender: {
		type: String,
		enum: [
			GenderEnum.Female.name,
			GenderEnum.Male.name
		]
	},
	birthDate: Date,
	updatedAt: Date,
	createdAt: Date,
	password: String,
	profileCompleted: {type: Boolean, default: false},
	email: {
		type: String,
		unique: true,
		required: true
	},
	gym: {type: mongoose.Schema.Types.ObjectId, ref: 'Gym'}
});

CoachSchema.pre('save', function (next) {
	const currentDate = new Date();
	this.updatedAt = currentDate;
	if (!this.createdAt)
		this.createdAt = currentDate;
	next();
});

CoachSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

CoachSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

const Coach = mongoose.model('Coach', CoachSchema, 'Coachs');

module.exports = Coach;
