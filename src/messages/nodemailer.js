import nodemailer from 'nodemailer'
import { logger } from '../logs/log4js.js';

export async function sendEmailToAdmin({subject,html}) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure:false,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        }
    });

    const mailOption ={
        from: process.env.NODEMAILER_EMAIL, 
        to: process.env.ADMIN_EMAIL, 
        subject: subject, 
        html: html,
    }
    try {
        let info = await transporter.sendMail(mailOption)
        logger.info(info);
    } catch (error) {
        logger.info(error);
    }
}