const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

async function sendMail({email, subject, message}) {
    await transporter.sendMail({
        from: 'no-replay@gmail.com',
        to: email,
        subject:subject,
        text: message,
        html: message,
    });
    return 'success';

}
module.exports ={sendMail}