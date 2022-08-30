import mongoose from "mongoose";

const cartsCollection = 'Carts';

const cartsSchema = new mongoose.Schema({
    products:{type:Array,required:true},
    date:{type:Number,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    city:{type:String,required:true},
    province:{type:String,required:true},
})

const CartsModel = mongoose.model(cartsCollection,cartsSchema) 

export {CartsModel}