import { CartsFactory } from "../factory/carts.factory.js"
import { logger } from "../logs/log4js.js"
import { ProductsService } from "./products.services.js"

const Factory = CartsFactory.useStorage()


export class CartsServices{
    static async create(){
        try {
            const date = Date.now() 
            const cart = {date,products:[]}
            const carrito = await Factory.createCart(cart)
            console.log('cart service carrrrito', carrito);
            return carrito
        } catch (error) {
            logger.error(`Entró al catch create cart`);
            logger.error(error.message);
        }

    }
    static async delateCart(id){
        try {
            const cart = await Factory.deleteCart(id)
            return cart
        } catch (error) {
            logger.error(`Entró al catch deleteOne cart`);
            logger.error(error.message);
        }
    }
    static async getACart(idCart){
        const cart = await Factory.getACart(idCart)
        return cart
    }
    static async getProductsOfCart(idCart){
        const cart = await this.getACart(idCart)
        const productsOfCart = cart.products
        return productsOfCart
    }
    static async addProductToCart(idCart,idProduct){
        let cart;
        let product;
        try {
            cart = await this.getACart(idCart)
            product = await ProductsService.getOneProductsById(idProduct)
            if (cart && product) {
                return await Factory.addProductToCart(product,idCart,cart)
            }else{
                return false
            }
        } catch(error) {
            logger.error(`Entró al catch addProductToCart`);
            logger.error(error);
        }
    }
    static async deleteAProducts(idCart,idProduct){
        try {
            const product = await ProductsService.getOneProductsById(idProduct)
            const existInCart = await this.getProductsOfCart(idCart).find(prod=> prod.id == idProduct)
            console.log(existInCart)
            const deleted = await Factory.deleteAProduct(idCart,idProduct,product)
            if(product && deleted){
                return true
            }else{
                return false
            }
        } catch (error) {
            logger.info('SERVICE DeleteProduct',error.message);
            logger.info('SERVICE DeleteProduct',error);
            return null
        } 
    }
}