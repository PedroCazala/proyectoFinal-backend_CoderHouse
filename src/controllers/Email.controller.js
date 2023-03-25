import { sendEmailToAdmin } from "../messages/nodemailer.js"

class EmailController{
    static async sendEmail(req,res){
        try{
            const {subject,html} =req.body
            sendEmailToAdmin({subject,html})
            res.send('enviado')
        }catch(error){
            console.log('entro al error');
            res.send(error)
        }
    }
}

export {EmailController}