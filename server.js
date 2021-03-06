import express from 'express'
import { allRoutes } from './src/routes/allRoutes.js'
import { logger } from './src/logs/log4js.js'
import 'dotenv/config'
import session  from 'express-session'

import passport from 'passport'

export const app = express()
const PORT = process.env.PORT || 8000
//Servidor en marcha
const server = app.listen(PORT,()=>{
    logger.info(`🔥Escuchando en http://localhost:${PORT}`);
})
server.on('error', error  => logger.error(`Error en el servidor ${error}`))

//poder enviar json
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// -------- ACCESO A ARCHIVOS PÚBLICOS -------
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

//pasar por argumento el puerto
import parseArgs from 'minimist';
export const argv = parseArgs(process.argv.slice(2))

//Para poder utilizar distintos modos de implementación del servidor
import { mode } from './src/mode/mode.js'
mode()

// -------- ROUTES -------
app.use('/',allRoutes)
