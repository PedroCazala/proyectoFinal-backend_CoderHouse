import axios from "axios"
import { development } from "../../server.js"
import { chatService } from "../services/chats.services.js"

export class ChatsController{
    static async view(req,res){
        const messages = await chatService.getAll()
        const user = req.user
        res.status(200).render('chat',{messages,user})
    }
    static async viewForEmail(req,res){
        const {email} = req.params
        let messages = []
        if(development) {
            try {
                const axiosData = await axios(`http://localhost:8080/chat/api/${email}`)
                messages = axiosData.data
            } catch (error) {
                console.log('Error:',error)
            }
        }else{
            try {
                const axiosData = await axios(`${process.env.HOST_HEROKU}/chat/api/${email}`)
                messages = axiosData.data
            } catch (error) {
                console.log('Error:',error)
            }
        }

        const user = req.user
        if (email) {
            res.status(200).render('chatForEmail',{messages,user})
        } else {
            res.status(400).json({error:'debe enviar un email'})
        }
    }

    static async create(req,res){
        try {
            const newMessage = req.body
            await chatService.create(newMessage)
            res.status(200).json({message:'El chat se ha guardado con éxito en la base de datos'})
        } catch (error) {
            res.status(500).json({message:'El chat NO ha guardado en la base de datos',error})
        }
    }

    static async getAll(req,res){
        const allMessages = await chatService.getAll()
        allMessages[0]?
            res.status(200).json(allMessages)
        :
            res.status(404).json({message:`No se encontraron chats en la base de datos`})
        
    }
    static async getForEmail(req,res){
        const {email} =req.params
        const messages = await chatService.getForEmail(email)
        messages[0]?
            res.status(200).json(messages)
        :
            res.status(404).json({message:`No se encontraron chats en la base de datos enviados desde el email: ${email}`})
        
    }
    static async deleteOne(req,res){
        const id = req.params.id
        const chat = await chatService.getOne(id)
        if(chat){
            await chatService.deleteOne(id)
            res.status(200).json({message:`El chat con id: ${id}, fué eliminado`})
        }else{
            res.status(404).json({message:`No se encontró ningún chat con el id: ${id} en la base de datos`})
        }
    }
}