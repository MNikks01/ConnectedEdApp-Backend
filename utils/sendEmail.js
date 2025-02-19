// utils/sendEmail.js

import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, text, html = '') => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can change this to use any other email service provider
        auth: {
            user: process.env.EMAIL_USER, // Sender's email address
            pass: process.env.EMAIL_PASS, // Sender's email password or app-specific password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error(`Error sending email: ${error}`);
    }
};
