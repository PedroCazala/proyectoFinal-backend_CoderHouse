import { chatDaoMongo } from "../DAO/mongoDb/chats.dao.mongo.js";

export class chatService{
    static async create(newMessage){
        const date = new Date().toLocaleString()
        const message = await chatDaoMongo.pushMessage({...newMessage,date})
        return message
    }
    static async getAll(){
        const allMessages = await chatDaoMongo.getAll()
        return allMessages
    }
    static async getOne(id){
        try {
            const allMessages = await chatDaoMongo.getOne(id)
            return allMessages
        } catch {
            return false
        }
    }
    static async deleteOne(id){
        await chatDaoMongo.deleteOne(id)
    }
}