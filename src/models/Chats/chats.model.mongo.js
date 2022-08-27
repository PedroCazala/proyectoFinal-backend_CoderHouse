import mongoose from "mongoose";

const chatCollection = 'Chats'

const chatSchema = {
    email:{type:String,required:true},
    date:{type:String,required:true},
    body:{type:String,required:true},
}

const chatModel = mongoose.model(chatCollection,chatSchema) 

export {chatModel}