import nodemailer from 'nodemailer'

export async function sendEmailToAdmin(usuario) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.ETHEREAL_EMAIL,
            pass: process.env.ETHEREAL_PASSWORD
        }
    });
    const mailOption ={
        from: process.env.ETHEREAL_MAIL, 
        to: process.env.ADMIN_EMAIL, 
        subject: "Nuevo Registro", 
        html: `
            <h1>Nuevo usuario</h1>
            <p>datos de usuario registrado:</p>
            ${usuario}
            `,
    }
    try {
        let info = await transporter.sendMail(mailOption)
        console.log(info);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log(error);
    }
}