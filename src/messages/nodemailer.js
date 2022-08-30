import nodemailer from 'nodemailer'
import { logger } from '../logs/log4js.js';

export async function sendEmailToAdmin({subject,html}) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure:false,
        auth: {
            user: process.env.ETHEREAL_EMAIL,
            pass: process.env.ETHEREAL_PASSWORD
            // user: 'savannah52@ethereal.email',
            // pass: 'cqupKs6NPtRSQjXkVG'
        }
    });

    const mailOption ={
        from: process.env.ETHEREAL_MAIL, 
        to: process.env.ADMIN_EMAIL, 
        // from: 'Sender Name <savannah52@ethereal.email>',
        // to: 'Recipient <cazalapedro@gmail.com>',
        subject: subject, 
        html: html,
    }
    try {
        let info = await transporter.sendMail(mailOption)
        logger.info(info);
        logger.info("Message sent: %s", info.messageId);
        logger.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        logger.info(error);
    }
}