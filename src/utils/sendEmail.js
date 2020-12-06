const nodemailer = require('nodemailer');
/**
 * @author Amlan Mallik <amlan.mallik@techjini.com>
 * @params { Object } smtp.
 * @description  Sends the email.
 *
 **/
module.exports = ({ config }) => {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.username,
      pass: config.password,
    },
  });

  return (to, subject, data, html = null, cc = null) => {
    return transport.sendMail({
      from: `${transport.auth.user}@${transport.service}.com`,
      to: to,
      subject: subject,
      cc: cc,
      text: data,
      html: html,
    });
  };
};
