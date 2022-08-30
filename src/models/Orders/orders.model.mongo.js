import mongoose from "mongoose";

const ordersCollection = 'Orders';

const ordersSchema = new mongoose.Schema({
    products:{type:Array,required:true},
    date:{type:Number,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    city:{type:String,required:true},
    province:{type:String,required:true},
    state: {type:String,required:true},
    dateOrder: {type:String, required:true},
    totalPrice: {type:Number,required:true},
    orderNumber: {type:Number,required:true}
})

const OrdersModel = mongoose.model(ordersCollection,ordersSchema) 

export {OrdersModel}