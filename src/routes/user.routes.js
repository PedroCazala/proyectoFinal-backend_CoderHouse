import { Router } from "express";
import passport from "passport";
import { upload } from "../container/daos/user/avatarUpload.js";
import { sendEmailToAdmin } from "../messages/nodemailer.js";

const userProfile = Router()

userProfile.get('/login',(req,res) =>{
    res.render('login')
})
userProfile.post('/login',passport.authenticate('local-login',{
    successRedirect:'/',
    failureRedirect:'/error',
    passReqToCallback:true
}))
userProfile.get('/logout',(req,res) =>{
    req.session.destroy()
    res.render('logout')
})
userProfile.get('/register',(req,res) =>{
    res.render('register')
})
userProfile.post('/register',upload.single('img'),
    passport.authenticate("local-signup",{
        successRedirect:'/',
        failureRedirect:'/register',
        passReqToCallback:true
    })
)
userProfile.get('/profile', (req, res) => {
    const user = req.user || 'No hay ninguna sesión de usuario activa'
    res.send(user)
})

userProfile.get('/infoUser',(req,res) =>{
    const user = req.user || {data:'proximamente será info de usuario'}
    res.send(user)
})
userProfile.get('/pruebaNodemailer',(req,res) =>{
    sendEmailToAdmin().catch(console.error);
    res.send('Mail send ok')
})

export {userProfile}