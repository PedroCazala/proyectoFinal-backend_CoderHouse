import mongoose from "mongoose";

const productsCollection = 'Productos';

const productsSchema = new mongoose.Schema({
    name:{type:String,required:true,max:100},
    description:{type:String,required:true,max:100},
    código:{type:String,required:true,max:100},
    img:{type:String,required:true,max:100},
    price:{type:Number,required:true,max:100},
    stock:{type:Number,required:true,max:100},
    date:{type:Number,required:true}
})
export const Product = mongoose.model(productsCollection,productsSchema) 