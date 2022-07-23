import twilio from 'twilio'
import { logger } from '../logs/log4js';
export class twilioSend{
    static sendWhatsappToAdmin(messageBody){
        const accountSid = 'AC37d79788c122b2c5e991017acfee0911'; 
        const authToken = process.env.TWILIO_TOKEN; 
        const client = twilio(accountSid, authToken); 

        client.messages 
            .create({ 
            body: messageBody, 
            //    mediaUrl: ['https://res.cloudinary.com/hdsqazxtw/image/upload/v1559681445/logo_coderhouse_2_bmqbet.png' ],
            from: 'whatsapp:+14155238886',       
            to: `whatsapp:${process.env.PHONE}` 
            }) 
            .then(message => logger.info(message.sid)) 
            .done();
    }
}