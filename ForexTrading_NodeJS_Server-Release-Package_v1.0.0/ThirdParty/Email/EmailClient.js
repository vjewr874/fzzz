/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

require('dotenv').config();
const nodemailer = require('nodemailer');

const emailConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT, // secure SMTP
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    // ciphers: process.env.SMTP_CIPHERS || '',
    rejectUnauthorized: false,
  },
};

const emailTransporter = nodemailer.createTransport(emailConfig);
emailTransporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log(success);
    console.log('Server is ready to take our messages');
  }
});

async function sendTestEmail(testEmail = 'chaupad@gmail.com') {
  console.info('sendTestEmail');
  let mailBody = '';
  mailBody += 'THÔNG BÁO!' + '\r\n\r\n';
  let subject = '[THÔNG BÁO] đây là email test hệ thống';
  await sendEmail(testEmail, subject, mailBody);
}

async function sendEmail(receiver, subject, body, html, emailClient) {
  let emailData = {
    from: `<${process.env.SMTP_EMAIL}>`,
    to: receiver,
    subject: subject,
  };

  if (emailClient) {
    try {
      emailData.from = emailClient.options.auth.user;
    } catch (error) {
      console.error(`can not get email of emailClient`);
      console.error(error);

      //if error, then use default
      emailData.from = `<${process.env.SMTP_EMAIL}>`;
    }
  }

  if (body) {
    emailData.text = body;
  }

  if (html) {
    emailData.html = html;
  }

  return new Promise((resolve, reject) => {
    if (emailClient === undefined) {
      emailClient = emailTransporter;
    }

    emailClient.sendMail(emailData, (err, info) => {
      if (err) {
        console.error('Send email error: ' + err);
        console.error(info);
        resolve(undefined);
      }
      if (info && info.messageId) {
        console.log(info);
        resolve(info.messageId);
      } else {
        resolve(undefined);
      }
    });
  });
}

async function createNewThirdpartyClient(email, password, serviceName = 'gmail', host = 'smtp.gmail.com') {
  var emailClient = nodemailer.createTransport({
    service: serviceName,
    host: host,
    auth: {
      user: email,
      pass: password,
    },
  });

  return emailClient;
}

async function createNewClient(smtpHost, smtpPort, smtpSecure, email, password) {
  const emailClient = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: email,
      pass: password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return emailClient;
}

module.exports = {
  sendEmail,
  sendTestEmail,
  createNewClient,
  createNewThirdpartyClient,
};
