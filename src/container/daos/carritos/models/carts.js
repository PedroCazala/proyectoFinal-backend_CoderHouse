import mongoose from "mongoose";

const cartsCollection = 'Carts';

const cartsSchema = new mongoose.Schema({
    products:{type:Array,required:true},
    date:{type:Number,required:true}
})
// const productsOfCartSchema = new mongoose.Schema({
//     name:{type:String,required:true,max:100},
//     description:{type:String,required:true,max:100},
//     código:{type:String,required:true,max:100},
//     img:{type:String,required:true,max:100},
//     price:{type:Number,required:true,max:100},
//     stock:{type:Number,required:true,max:100},
//     date:{type:Number,required:true},
//     _id:{type:Number,required:true}
// })
const Carts = mongoose.model(cartsCollection,cartsSchema) 
// const ProductsOfCart = mongoose.model(cartsCollection,productsOfCartSchema) 

export {Carts,/*ProductsOfCart*/}