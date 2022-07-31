import { logger } from "../../logs/log4js.js"
import { CartsModel } from "../../models/Carts/carts.model.mongo.js"

export class CartsDaoMongo{
    static async createCart(cart){
        const mongoCart = await CartsModel.insertMany([cart])
        return mongoCart
    }
    static async deleteCart(id){
        await CartsModel.deleteOne({_id:id})
    }
    static async getACart(idCart){
        const cart = await CartsModel.findOne({_id:idCart})
        return cart
    }

    static async addProductToCart(product,idCart){
        try {
            const update = await CartsModel.findOneAndUpdate({_id:idCart},{$push:{products:product}})
            return update
        } catch (error) {
            logger.info('entro al catch');
            logger.info(error);
        }
    }
    static async deleteAProduct(idCart,idProduct,product){
        const deleted = await CartsModel.updateOne({"_id":idCart},{$pull:{"products":product}})
        // const deleted = await CartsModel.findOneAndUpdate({_id:idCart},{products:{$pop:{_id:idProduct}}})
        return deleted
    }
}
