/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

const { sendEmail } = require('../../ThirdParty/Email/EmailClient');
const { generateNewOTPEmail } = require('../../ThirdParty/Email/EmailGenerator');
const { sendVoiceOTP } = require('../../ThirdParty/StringeeOTPAPI/StringeeOtpFunctions');

async function sendOTPToPhoneNumber(phoneNumber, otp) {
  let sendResult = await sendVoiceOTP(phoneNumber, otp);
  return sendResult;
}

async function sendOTPToEmail(email, otp) {
  let _emailContent = generateNewOTPEmail('', otp);
  let sendOtpResult = await sendEmail(email, _emailContent.subject, _emailContent.body, _emailContent.htmlBody);
  return sendOtpResult;
}

module.exports = {
  sendOTPToPhoneNumber,
  sendOTPToEmail,
};
