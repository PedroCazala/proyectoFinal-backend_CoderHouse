import { Router } from "express";
import { ChatsController } from "../controllers/chats.controller.js";

const chatRouter = Router()

chatRouter.get('/',(req,res)=>{
    ChatsController.view(req,res)
})

chatRouter.get('/api',(req,res)=>{
    ChatsController.getAll(req,res)
})
chatRouter.post('/api',(req,res)=>{
    ChatsController.create(req,res)
})
chatRouter.delete('/api/:id',(req,res)=>{
    ChatsController.deleteOne(req,res)
})

export {chatRouter}