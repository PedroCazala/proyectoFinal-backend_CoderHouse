import { chatService } from "../services/chats.services.js"

export class ChatsController{
    static view(req,res){
        res.status(200).render('chat')
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