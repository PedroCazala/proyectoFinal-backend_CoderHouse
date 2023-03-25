//Esta sección se utilizará para poder enviar email desde la sección contacto de mi portafolio a mi cuenta personal
//pedrocazala.netlify.app

import { Router } from "express";
import {EmailController} from '../controllers/Email.controller.js'
const emailRouter= Router()


emailRouter.post('/',(req,res)=>{
    EmailController.sendEmail(req,res)
})

export {emailRouter}