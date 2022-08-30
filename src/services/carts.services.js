import { CartsFactory } from "../factory/carts.factory.js"
import { logger } from "../logs/log4js.js"
import { ProductsService } from "./products.services.js"

const Factory = CartsFactory.useStorage()


export class CartsServices{
    static async create(bodyReq){
        try {
            const date = Date.now() 
            const cart = {date,products:[],...bodyReq}
            const carrito = await Factory.createCart(cart)
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
    static async addProductToCart({idCart,idProduct,quantity}){
        const cart = await this.getACart(idCart)
        let productExistInCart = await this.getOneProductoOfCartById({cart,idProduct})
        if(productExistInCart){
            let cartProducts = await this.getProductsOfCart(idCart)
            let product = await this.getOneProductoOfCartById({cart,idProduct})
            const index = cart.products.indexOf(product)
            product.quantity = product.quantity + quantity
            cart.products[index] = product
            await Factory.updateProductToCart({cart,idCart})
            return 'updated'
        }else{
            let product;
            try {
                
                const infoProd = await ProductsService.getOneProductsById(idProduct)
                product = {...infoProd,quantity}
                if (cart && product) {
                    await Factory.addProductToCart(product,idCart,cart)
                    return 'added'
                }else{
                    return false
                }
            } catch(error) {
                logger.error(`Entró al catch addProductToCart`);
                logger.error(error);
            }
        }
    }
    static async getOneProductoOfCartById({cart,idProduct}){
        try {
            const product = await cart.products.find(prod => prod._id == idProduct)
            if (product) {
                return product
            }else{
                return false
            }
        } catch(error) {
            logger.error(`Entró al catch addProductToCart`);
            logger.error(error);
            return false
        }
    }
    static async deleteAProducts(idCart,idProduct){
        try {
            const product = await ProductsService.getOneProductsById(idProduct)
            const existInCart = await this.getProductsOfCart(idCart).find(prod=> prod.id == idProduct)
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