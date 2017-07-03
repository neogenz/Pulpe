'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Member = require('./Member');
const Coach = require('./Coach');
const DocumentType = require('../_enums/DocumentType');
const CategoryDocument = require('../_enums/CategoryDocument');

const DocumentSchema = new Schema({
	data: String,
	member: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'},
	coach: {type: mongoose.Schema.Types.ObjectId, ref: 'Coach'},
	format: {
		type: String,
		enum: [DocumentType.PNG.name, DocumentType.JPG.name, DocumentType.PDF.name],
		default: DocumentType.PNG.name
	},
	category: {
		type: String,
		enum: [CategoryDocument.Profile.name]
	},
	updatedAt: Date,
	createdAt: Date
});

DocumentSchema.pre('save', function (next) {
	const currentDate = new Date();
	this.updatedAt = currentDate;
	if (!this.createdAt)
		this.createdAt = currentDate;
	next();
});

const Document = mongoose.model('Document', DocumentSchema, 'Documents');

module.exports = Document;