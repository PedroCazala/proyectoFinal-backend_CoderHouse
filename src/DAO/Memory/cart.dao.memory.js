
import { newId } from "../../funciones.js"
import { logger } from "../../logs/log4js.js"
import { CartsModel } from "../../models/Carts/carts.model.mongo.js"
const Carts =[]
export class CartsDaoMemory{
    static async createCart(cart){
        const newCart = {...cart,id:newId(Carts)}
        Carts.push(newCart)
        return newCart
    }
    static async deleteCart(id){
        const cart = Carts.find(cart=>cart.id ==id)
        const index=Carts.indexOf(cart)
        Carts.splice(index,1)
    }
    static async getACart(idCart){
        const cart = Carts.find(cart=>cart.id ==idCart)
        return cart
    }

    static async addProductToCart(product,idCart){
        try {
            await this.getACart(idCart)
            return true
        } catch (error) {
            logger.info('entro al catch');
            logger.info(error);
        }
    }
    static async deleteAProduct(idCart,idProduct){
        const cart = await this.getACart(idCart)
        
        let indexCart = Carts.indexOf(cart)
        let product = Carts[indexCart].products.find(prod =>prod.id ==idProduct)
        let indexProduct = cart.products.indexOf(product)

        const deleted = await Carts[indexCart].products.splice(indexProduct,1)
        return deleted
    }
}
