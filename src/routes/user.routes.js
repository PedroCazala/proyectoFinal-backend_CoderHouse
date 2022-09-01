import { Router } from "express";
import passport from "passport";
import { upload } from "../container/daos/user/avatarUpload.js";
import { sendEmailToAdmin } from "../messages/nodemailer.js";
import { generateToken } from "../passport/jwt.js";

const userRoutes = Router()

userRoutes.get('/login',(req,res) =>{
    res.render('login')
})
userRoutes.post('/login',passport.authenticate('local-login',{
    // successRedirect:'/',
    failureRedirect:'/error',
    passReqToCallback:true
}),(req,res)=>{
    const user = req.user
    const token = generateToken(user)
    console.log(token);
    req.session.token = token
    res.status(200).redirect("/")
})
userRoutes.get('/logout',(req,res) =>{
    req.session.destroy()
    res.render('logout')
})
userRoutes.get('/register',(req,res) =>{
    res.render('register')
})
userRoutes.post('/register',upload.single('img'),
    passport.authenticate("local-signup",{
        successRedirect:'/',
        failureRedirect:'/register',
        passReqToCallback:true
    })
)
userRoutes.get('/profile', (req, res) => {
    const user = req.user || 'No hay ninguna sesión de usuario activa'
    res.send(user)
})

// Autenticación con --->> JWT
userRoutes.get('/infoUser',passport.authenticate('jwt'),
    (req,res)=>{
        console.log('entro');
        res.send({
            message:"logrado",
            user:req.user, 
            token:req.query.secret_token
        })
    }
)


export {userRoutes}