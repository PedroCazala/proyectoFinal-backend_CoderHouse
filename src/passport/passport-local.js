import passport from "passport";
import { Strategy } from "passport-local";
import { upload } from "../container/daos/user/avatarUpload.js";
// import { UserDaoMongoDB } from "../container/daos/user/UserDaoMongoDB.js";
import { User } from '../container/daos/user/userModel.js'
import { connectMongoDB } from "../container/MongoDbContainer.js";
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
                console.log(`El usuario con el email ${email}, ya existe`);
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
                sendEmailToAdmin(newUser)
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
                console.log(messageSingInError);
                done(null,false)
            }else if(!user.comparePassword(password)){
                const messageSingInError =`La contraseña es incorrecta, ...ver como enviar una respuesta`
                console.log(messageSingInError,user.password,password);
                done(null,false)
            }else{
                done(null,user)
            }
        }
    )
)