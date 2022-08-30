import { logger } from "../../logs/log4js.js";
import { OrdersModel } from "../../models/Orders/orders.model.mongo.js";

export class OrdersDaoMongo {
    static async insertOne(order){
        try {
            const saveOrder = await OrdersModel.insertMany([order])
            console.log('funciono','orderInsert');
            return saveOrder[0]
        } catch (error) {
            console.log('no funciono');
            logger.error(error);
            return false
        }
    }
    
    static async updateState({idOrder,newState}){
        await OrdersModel.findOneAndUpdate({_id:idOrder},{state:newState})
        const update = await OrdersModel.find({_id:idOrder})
        return update
    }

    static async getAll(){
        const allOrders = await OrdersModel.find({})
        return allOrders
    }
    static async getForEmail(email){
        const allOrders = await OrdersModel.find({email:email})
        return allOrders
    }
    static async getOneById(){}
}
