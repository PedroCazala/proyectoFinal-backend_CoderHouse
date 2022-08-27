import mongoose from "mongoose";

const cartsCollection = 'Carts';

const cartsSchema = new mongoose.Schema({
    products:{type:Array,required:true},
    date:{type:Number,required:true}
})

const CartsModel = mongoose.model(cartsCollection,cartsSchema) 

export {CartsModel}