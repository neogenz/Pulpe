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
		html: getTemplate(password)
	};
}

module.exports = EmailService;


function getTemplate(password) {
	return `<!--Download - https://github.com/lime7/responsive-html-template.git-->
<!--View - https://www.behance.net/gallery/30553501/Responsive-Email-->
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>One Letter</title>

	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

	<style>
		.ReadMsgBody {width: 100%; background-color: #ffffff;}
		.ExternalClass {width: 100%; background-color: #ffffff;}

				/* Windows Phone Viewport Fix */
		@-ms-viewport { 
		    width: device-width; 
		}
	</style>

	<!--[if (gte mso 9)|(IE)]>
	    <style type="text/css">
	        table {border-collapse: collapse;}
	        .mso {display:block !important;} 
	    </style>
	<![endif]-->

</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" style="background: #e7e7e7; width: 100%; height: 100%; margin: 0; padding: 0;">
	<!-- Mail.ru Wrapper -->
	<div id="mailsub">
		<!-- Wrapper -->
		<center class="wrapper" style="table-layout: fixed; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; padding: 0; margin: 0 auto; width: 100%; max-width: 960px;">
			<!-- Old wrap -->
	        <div class="webkit">
				<table cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="padding: 0; margin: 0 auto; width: 100%; max-width: 960px;">
					<tbody>
						<tr>
							<td align="center">
								<!-- Start Section (1 column) -->
								<table id="intro" cellpadding="0" cellspacing="0" border="0" bgcolor="#4F6331" align="center" style="width: 100%; padding: 0; margin: 0; background-image: url(https://github.com/neogenz/Pulpe/blob/master/front/src/assets/img/background.jpg?raw=true); -webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;">
									<tbody >
										<tr><td colspan="3" height="20"></td></tr>
										<tr>
											<td width="330" style="width: 33%;">
												<div style="text-align: center; max-width: 150px; width: 33px; height:33px;">
												</div>
											</td>
											<!-- Logo -->
											<td width="300" style="width: 30%;" align="center">
												<a href="#" target="_blank" border="0" style="border: none; display: block; outline: none; text-decoration: none; line-height: 60px; height: 60px; color: #ffffff; font-family: Verdana, Geneva, sans-serif;  -webkit-text-size-adjust:none;">
													<img src="https://github.com/neogenz/Pulpe/blob/master/front/src/assets/logo.png?raw=true" alt="One Letter" width="100" height="126" border="0" style="border: none; display: block; -ms-interpolation-mode: bicubic;">
												</a>
											</td>
											<!-- Social Button -->
											<td width="330" style="width: 33%;" align="right">
												<div style="text-align: center; max-width: 150px; width: 33px; height:33px;">
												</div>
											</td>
										</tr>
										<tr><td colspan="3" height="100"></td></tr>
										<!-- Main Title -->
										<tr>
											<td colspan="3" height="60" align="center" style="padding: 10px 0;background-color: rgba(0, 0, 0, 0.38);">
												<div border="0" style="border: none; line-height: 60px; color: #ffffff; font-family: Verdana, Geneva, sans-serif; font-size: 39px; text-transform: uppercase; font-weight: bolder;">Bienvenue</div>
												<img src="https://github.com/lime7/responsive-html-template/blob/master/index/line-1.png?raw=true" alt="line" border="0" width="464" height="5" style="border: none; outline: none; max-width: 464px; width: 100%; -ms-interpolation-mode: bicubic;" >
												<p style="font-size: 18px; line-height: 24px; font-family: Verdana, Geneva, sans-serif; color: #ffffff; text-align: center; mso-table-lspace:0;mso-table-rspace:0;">
																		Connectez-vous désormais avec le mot de passe ci-dessous.
																	</p>
											</td>
										</tr>
										<!-- Line 1 -->
										<tr>
											<td colspan="3" height="20" valign="bottom" align="center">
												
											</td>
										</tr>
										<!-- Meta title -->
										<tr>
											<td colspan="3">
												<table cellpadding="0" cellspacing="0" border="0" align="center" style="padding: 0; margin: 0; width: 100%;">
													<tbody>
														<tr>
															<td width="90" style="width: 9%;"></td>
															<td align="center">
																<div border="0" style="border: none; height: 60px;">
																	
																</div>
															</td>
															<td width="90" style="width: 9%;"></td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										
										<tr>
											<td width="330"></td>
											<!-- Button Start -->
											<td width="300" align="center" height="52">
												<div style="background-size: 100% 100%; background-position: center center; width: 225px;">
													<p href="#" target="_blank" width="160" height="52" border="0" bgcolor="#009789" style="border: none; outline: none; display: block; width:160px; height: 52px; text-decoration: none; font-size: 17px; line-height: 52px; color: #ffffff; font-family: Verdana, Geneva, sans-serif; text-align: center; background-color: #ff5600;  -webkit-text-size-adjust:none;border-radius:10px;">
														${password}
													</p>
												</div>
											</td>
											<td width="330"></td>
										</tr>
										<tr><td colspan="3" height="85"></td></tr>
									</tbody>
								</table><!-- End Start Section -->
								<!-- Footer -->
								<table id="news__article" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" align="center" style="width: 100%; padding: 0; margin: 0; background-color: #ffffff">
									<tbody>
										<tr><td colspan="3" height="23"></td></tr>
										<tr>
											<td align="center">
												<div border="0" style="border: none; line-height: 14px; color: #727272; font-family: Verdana, Geneva, sans-serif; font-size: 16px;">
													2017 © <a href="" target="_blank" border="0" style="border: none; outline: none; text-decoration: none; line-height: 14px; font-size: 16px; color: #727272; font-family: Verdana, Geneva, sans-serif; -webkit-text-size-adjust:none;">Pulpe Inc</a>
												</div>
											</td>
										</tr>
										<tr><td colspan="3" height="23"></td></tr>
									</tbody>
								</table> <!-- End Footer -->
							</td>
						</tr>
					</tbody>
				</table>
			</div> <!-- End Old wrap -->
		</center> <!-- End Wrapper -->
	</div> <!-- End Mail.ru Wrapper -->
</body>

</html>`;
}