const nodeMailer = require("nodemailer");

const sendEmail = async (email, subject, message) => {
  const transporter = nodeMailer.createTransport({
    // host: process.env.HOST,
    // port: process.env.MAIL_PORT,
    service: process.env.SERVICE,
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: message,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
