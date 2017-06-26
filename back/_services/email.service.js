const nodemailer = require('nodemailer');
const winston = require('winston');
const mailConfig = require('../_config/email.json')[process.env.NODE_ENV];

class EmailService {
	constructor() {
	}

	/**
	 * Send an email to a member with his password.
	 * @param member
	 * @param passwordGenerated
	 */
	static sendPasswordTo(member, passwordGenerated) {
		if (!passwordGenerated) {
			throw new Error('No password has been generated');
		}
		if (!member.email) {
			throw new Error('Member didnt have an email');
		}
		const transport = getTransport();
		const mailOptions = getMailOptions(member.email, passwordGenerated);
		const promise = new Promise((resolve, reject) => {
			// send mail with defined transport object
			transport.sendMail(mailOptions, (error, info) => {
				if (error) {
					winston.log('error', error.stack);
					return reject(error);
				}
				console.log('Message %s sent: %s', info.messageId, info.response);
				return resolve();
			});
		});
		return promise;
	}

}

/**
 * create reusable transporter object using the default SMTP transport
 * @returns {*}
 */
function getTransport() {
	return nodemailer.createTransport({
		host: mailConfig.host,
		port: mailConfig.port,
		secure: false, // secure:true for port 465, secure:false for port 587
		auth: {
			user: mailConfig.user,
			pass: mailConfig.password
		}
	});
}

/**
 * setup email data with unicode symbols
 * @param email
 * @param password
 * @returns {{from, to: (CoachSchema.email|{type, unique, required}|Person.email|{type, required, index}|*), subject: string, text: string}}
 */
function getMailOptions(email, password) {
	return {
		from: `<${mailConfig.user}>`,
		to: email,
		subject: 'Bienvenue chez Pulpe. ✔',
		html: `<h2>Vous êtes désormais inscrit sur Pulpe (petite salope en manque)! </h2><br><span>Votre mot de passe est : ${password}.</span>`
	};
}

module.exports = EmailService;


