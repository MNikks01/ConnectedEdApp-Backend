import nodemailer from 'nodemailer';
import { config } from './config.js';

export const transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: config.email.auth
});

export const sendEmail = async ({ to, subject, html }) => {
    try {
        const mailOptions = {
            from: config.email.auth.user,
            to,
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw new Error(`Email sending failed: ${error.message}`);
    }
}; 