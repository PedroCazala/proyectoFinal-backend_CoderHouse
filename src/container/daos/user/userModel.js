import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs"

const userCollection = 'Usuarios';

const usersSchema = new mongoose.Schema({
    email:{type:String,required:true,max:100},
    password:{type:String,required:true,max:100},
    name:{type:String,required:true,max:100},
    address:{type:String,required:true,max:100},
    age:{type:Number,required:true,max:100},
    phone:{type:Number,required:true},
    img:{type:String,required:false}
})
usersSchema.methods.encryptPassword =(password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}

usersSchema.methods.comparePassword = function (password) {
    return  bcrypt.compareSync(password,this.password)
}

const User = mongoose.model(userCollection,usersSchema)
export {User}