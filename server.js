import express from 'express'
import { allRoutes } from './src/routes/allRoutes.js'
import 'dotenv/config'
import session  from 'express-session'

import passport from 'passport'

export const app = express()
const PORT = process.env.PORT || 8000

//Servidor en marcha
const server = app.listen(PORT,()=>{
    console.log(`🔥Escuchando en http://localhost:${server.address().port}`);
})
server.on('error', error  => console.log(`Error en el servidor ${error}`))

//poder enviar json
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// -------- ACCESO A ARCHIVOS PUBLICOS -------
app.use(express.static('public'))



// -------- VISTAS CON EJS -------
app.set('view engine','ejs')
app.set('views','./src/views')

// -------- Manejo de sesiones -------
app.use(session({
    // store: MongoStore,
    secret: 'dfafasf',
    resave: false,
    saveUninitialized:false
}))
// -------- PARA USAR PASSPORT -------
app.use(passport.initialize())                              
app.use(passport.session())
import './src/passport/passport-local.js'

// -------- ROUTES -------
app.use('/',allRoutes)
