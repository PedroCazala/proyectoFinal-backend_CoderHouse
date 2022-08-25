import mongoose from "mongoose";

const productsCollection = 'Productos';

const productsSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    código:{type:String,required:true},
    img:{type:String,required:true},
    price:{type:Number,required:true},
    stock:{type:Number,required:true},
    date:{type:String,required:true}
})
export const ProductModel = mongoose.model(productsCollection,productsSchema) 
