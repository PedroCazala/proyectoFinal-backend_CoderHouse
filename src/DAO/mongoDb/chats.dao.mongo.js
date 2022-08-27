import { chatModel } from "../../models/Chats/chats.model.mongo.js";

export class chatDaoMongo{
    static async pushMessage(message){
        const chat = await chatModel.insertMany([message])
        return chat
    }
    static async getAll(){
        const allChats = await chatModel.find()
        return allChats
    }
    static async getOne(id){
        const chat = await chatModel.findOne({_id:id})
        return chat
    }
    static async deleteOne(id){
        await chatModel.findOneAndDelete({_id:id})
    }
}