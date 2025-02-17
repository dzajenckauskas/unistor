const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(getters, subject, text, html, noreply) {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.emailHost,
      port: 465,
      secure: true, // true for 465, false for other ports

      auth: {
        user: process.env.email,
        pass: process.env.emailPassword,
      },
    });
    return await transporter.sendMail({
      from: process.env.email, // sender address
      to: getters, // list of receivers
      subject, // Subject line
      text, // plain text body
      html,
      replyTo: noreply ? process.env.email : `noreply.${process.env.email}`,
    });
  } catch (error) {
    console.log(error);
  }
}
