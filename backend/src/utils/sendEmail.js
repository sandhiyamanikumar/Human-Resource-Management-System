const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: `"HRMS Team" <${process.env.USER}>`,
            to: email,
            subject,
            html,
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Email not sent:', error.message);
    }
};

module.exports = sendEmail;
