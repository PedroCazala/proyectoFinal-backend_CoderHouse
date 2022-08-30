import express from 'express'
import { allRoutes } from './src/routes/allRoutes.js'
import { logger } from './src/logs/log4js.js'
import 'dotenv/config'
import session  from 'express-session'

import passport from 'passport'

export const app = express()

//pasar por argumento el puerto
import parseArgs from 'minimist';
export const argv = parseArgs(process.argv.slice(2))

// -------- sockets -------
import { Server as HttpServer} from 'http' 
import {Server as IOServer} from 'socket.io'
import axios from 'axios'
const httpServer = new HttpServer(app);
export const io = new IOServer(httpServer);

export const development = argv.development || false
logger.info('development,',development);
io.on("connection", function (socket) {
    logger.warn('Nuevo usuario conectado 1');

    socket.on('newChat', ()=>{
        development ?
            axios('http://localhost:8080/chat/api')
            .then(res=>io.sockets.emit("chat",res.data))
            .catch(err=>console.log('Errorrrrr:',err))
        :
            axios(`${process.env.HOST_HEROKU}/chat/api`)
            .then(res=>io.sockets.emit("chat",res.data))
            .catch(err=>console.log('Errorrrrr:',err))
    })
})

export const PORT = process.env.PORT || 8000
//Servidor en marcha
export const server = httpServer.listen(PORT,()=>{
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


//Para poder utilizar distintos modos de implementación del servidor
import { mode } from './src/mode/mode.js'
mode()

// -------- SWAGGER -------
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import optionsSwagger from './swagger.js'

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(optionsSwagger)))

// -------- ROUTES (Debe estar al final del server) -------
app.use('/',allRoutes)
