import { logger } from "../../logs/log4js.js"
import { CartsModel } from "../../models/Carts/carts.model.mongo.js"

export class CartsDaoMongo{
    static async createCart(cart){
        const mongoCart = await CartsModel.insertMany([cart])
        return mongoCart[0]._id
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
            await CartsModel.findOneAndUpdate({_id:idCart},{$push:{products:product}})
            const updated = await CartsModel.findOne({_id:idCart})
            return updated
        } catch (error) {
            logger.info('entro al catch');
            logger.info(error);
        }
    }
    static async updateProductToCart({cart,idCart}){
        try {
            await CartsModel.findOneAndUpdate({_id:idCart},cart)
            const updated = await CartsModel.findOne({_id:idCart})
            return updated
        } catch (error) {
            logger.info('entro al catch');
            logger.info(error);
        }
    }
    static async deleteAProduct(idCart,idProduct,product){
        try {
            await CartsModel.updateOne({"_id":idCart},{$pull:{"products":product}})
            return true
        } catch {
            return false
        }
    }
}
