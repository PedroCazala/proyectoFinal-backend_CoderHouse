import passport from "passport";
import { Strategy } from "passport-local";
import { upload } from "../container/daos/user/avatarUpload.js";
import { User } from '../models/User/user.model.mongo.js'
import { connectMongoDB } from "../db/connectMongoDB.js";
import { logger } from "../logs/log4js.js";
import { sendEmailToAdmin } from "../messages/nodemailer.js";
import { twilioSend } from "../messages/twilio.js";

connectMongoDB()
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user); 
});

const LocalStrategy = Strategy;

const users = [
    {email:'cazalapedro@gmail.com',password:'1234',data:'fadsdfsdf', name:"Pedrito"}
]
passport.use(
    "local-signup",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            const user = await User.findOne({email:email})
            if(user){
                logger.warn(`El usuario con el email ${email}, ya existe`);
                done(null,false)
            }else{
                const newUser = await new User();
                
                const {name,address, age, phone, img} =req.body
                newUser.name = name;
                newUser.address = address;
                newUser.age = age;
                newUser.phone = phone;
                newUser.img = req.file.filename;
                newUser.email = email;
                newUser.password = newUser.encryptPassword(password);
                await newUser.save();
                const htmlMail = `
                <h1 style="color:greenyellow;background-color:black; text-align:center;border-radius:15px;padding:5px;">Nuevo usuario ${newUser.id} || ${newUser.name} </h1>
                <h2>Mail del usuario: ${newUser.email}</h2>
                <h3>Datos de: ${newUser.name}</h3>
                <ul>
                    <li>Teléfono: ${newUser.phone}</li>
                    <li>Dirección: ${newUser.address}</li>
                </ul>
                `
                sendEmailToAdmin({html:htmlMail,subject:'Nuevo usuario registrado'})
                // twilioSend.sendWhatsappToAdmin(`El usuario ${name}, se registro con el email: ${email},${newUser}`)
                done(null, newUser);
            }
        }
    )
)

passport.use(
    'local-login',
    new LocalStrategy (
        {usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,},
        async (req, email, password, done)=>{
            const user = await User.findOne({email:email})
            if (!user) {
                const messageSingInError =`El usuario no existe, ...ver como enviar una respuesta`
                logger.warn(messageSingInError);
                done(null,false)
            }else if(!user.comparePassword(password)){
                const messageSingInError =`La contraseña es incorrecta, ...ver como enviar una respuesta`
                logger.warn(messageSingInError,user.password,password);
                done(null,false)
            }else{
                done(null,user)
            }
        }
    )
)