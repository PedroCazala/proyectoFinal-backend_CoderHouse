import { CartsDaoMemory } from "../DAO/Memory/cart.dao.memory.js"
import { CartsDaoMongo } from "../DAO/mongoDb/cart.dao.mongo.js"
import { CartsFactory } from "../factory/carts .factory.js"
import { logger } from "../logs/log4js.js"
import { ProductsService } from "./products.services.js"

// const DAO = CartsDaoMongo
const DAO = CartsDaoMemory
// const DAO = CartsDaoFileSystem
// const DAO = CartsDaoFirebase

//La IDEA es usar este factory
const Factory = new CartsFactory()


export class CartsServices{
    static async create(){
        try {
            const date = Date.now() 
            const cart = {date,products:[]}
            const carrito = await DAO.createCart(cart)
            return carrito
        } catch (error) {
            logger.error(`Entró al catch create cart`);
            logger.error(error.message);
        }

    }
    static async delateCart(id){
        try {
            const cart = await DAO.deleteCart(id)
            return cart
        } catch (error) {
            logger.error(`Entró al catch deleteOne cart`);
            logger.error(error.message);
        }
    }
    static async getACart(idCart){
        const cart = await DAO.getACart(idCart)
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
            await DAO.addProductToCart(product,idCart,cart)
        } catch {
            return{
                error:`El carrito con el id número: ${idCart}, no existe, y/o el producto con el id número: ${idProduct}, no existe`
            }
        }
    }
    static async deleteAProducts(idCart,idProduct){
        try {
            const product = await ProductsService.getOneProductsById(idProduct)
            const deleted = await DAO.deleteAProduct(idCart,idProduct,product)
            return deleted
        } catch (error) {
            logger.info('SERVICE DeleteProduct',error.message);
            logger.info('SERVICE DeleteProduct',error);
            return null
        } 
    }
}