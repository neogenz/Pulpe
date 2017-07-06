'use strict';

const Exercise = require('./Exercise');
const Session = require('./Session');
const mongoose = require('mongoose');
const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const Schema = mongoose.Schema;
const ProgramSchema = new Schema({
	member: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'},
	sessions: [Session.schema],
	objective: {
		type: String,
		enum: [
			ObjectiveEnum.MassGainer.name,
			ObjectiveEnum.GeneralForm.name,
			ObjectiveEnum.WeightLoss.name
		]
	},
	isActive: {type: Boolean, default: false, required: true},
	updatedAt: Date,
	createdAt: Date,
	_sessionTodo: {type: mongoose.Schema.Types.ObjectId, ref: 'Session'}
});

ProgramSchema.pre('save', function (next) {
	const currentDate = new Date();
	this.updatedAt = currentDate;
	if (!this.createdAt)
		this.createdAt = currentDate;
	next();
});

ProgramSchema.query.ofThisMember = function (member) {
	return this.find({member: member});
};

ProgramSchema.query.ofThisSession = function (sessionId) {
	return this.find({'sessions._id': sessionId});
};

ProgramSchema.query.isActive = function () {
	return this.find({isActive: true});
};

const Program = mongoose.model('Program', ProgramSchema, 'Programs');

Program.of = () => {
	return new ProgramBuilder();
};

class ProgramBuilder {
	constructor() {
		this.me = new Program();
	}

	member(member) {
		this.me.member = member;
		return this;
	}

	sessions(sessions) {
		this.me.sessions = sessions;
		return this;
	}

	objective(objective) {
		this.me.objective = objective;
		return this;
	}

	isActive(isActive) {
		this.me.isActive = isActive;
		return this;
	}

	sessionTodo(session) {
		this.me._sessionTodo = session;
		return this;
	}

	build() {
		return this.me;
	}
}

module.exports = Program;
