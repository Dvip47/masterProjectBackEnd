const nodeMailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const sendEmail = async (email, subject, message, location) => {
  const transporter = nodeMailer.createTransport({
    // host: process.env.HOST,
    host: "email-smtp.ap-south-1.amazonaws.com",
    // port: process.env.MAIL_PORT,
    port: 587,
    secure: false,
    auth: {
      // user: process.env.USERNAME,
      user: "AKIASDA22VLVE7ZBARLL",
      // pass: process.env.PASSWORD,
      pass: "BHDlXAWLfu+K9pkH3V5B04hsoVDtA6uoyxJEzASs6qE9",
    },
  });
  const options = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./src/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./src/views"),
    extName: ".handlebars",
  };
  transporter.use("compile", hbs(options));
  const mailOptions = {
    // from: process.env.EMAIL,
    from: "alert@polobix.com",
    to: email,
    subject: subject,
    template: "email",
    context: {
      message,
      location,
    },
  };
  return await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
