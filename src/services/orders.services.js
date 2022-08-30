import { OrdersDaoMongo } from "../DAO/mongoDb/orders.dao.mongo.js"
import { newId } from "../funciones.js"
import { logger } from "../logs/log4js.js"
import { sendEmailToAdmin } from "../messages/nodemailer.js"
import { CartsServices } from "./carts.services.js"

export class OrderService {
    static async generate(idCart){
        const cart = await CartsServices.getACart(idCart)
        const arrayDeTotales = cart.products.map(product => {return product.quantity * product.price})
        const totalPrice = arrayDeTotales.reduce((a,b)=>a+b)
        const dateOrder = new Date().toLocaleString()
        const allOrders = await this.getAll()
        const orderNumber = newId(allOrders)
        const {products,date,email,address,city,province} = cart._doc
        const cartToSave = {products,date,email,address,city,province,orderNumber}
        const order = {...cartToSave,totalPrice,dateOrder,state:"generada"}

        const saveOrder = OrdersDaoMongo.insertOne(order)
        return saveOrder
    }
    static async updateState({idOrder,newState}){
        const update = await OrdersDaoMongo.updateState({idOrder,newState})
        return update
    }
    static async getAll (){
        const allOrders = await OrdersDaoMongo.getAll()
        return allOrders
    }
    static async getForEmail (email){
        const allOrders = await OrdersDaoMongo.getForEmail(email)
        return allOrders
    }
}