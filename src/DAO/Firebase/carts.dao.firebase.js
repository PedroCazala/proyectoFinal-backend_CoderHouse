import { productsRef,cartsRef,FieldValue } from "../../db/connectFirebase.js";
import { logger } from "../../logs/log4js.js";

export class CartsDaoFirebase{
    static async createCart(cart){
        const firebaseCart = await cartsRef.doc().set(cart)
        return firebaseCart
    }
    static async deleteCart(id){
        await cartsRef.doc(id).delete()
    }
    static async getACart(idCart){
        const cartFirebase = await cartsRef.doc(idCart).get()
        const cart = {...cartFirebase.data(),id:cartFirebase.id}
        return cart
    }

    static async addProductToCart(product,idCart){
        try {
            const cart = await cartsRef.doc(idCart)
            const update = await cart.update({
                products: FieldValue.arrayUnion(product)
              });
            return update
        } catch (error) {
            logger.info('entro al catch');
            logger.info(error);
        }
    }
    static async deleteAProduct(idCart,idProduct){
        // devuelve el carrito como obj
        const cart = await this.getACart(idCart)
       
        let product = cart.products.find(prod =>prod.id ==idProduct)
        let indexProduct = cart.products.indexOf(product)
        const deleted = cart.products.splice(indexProduct,1)
        //Sube los productos nuevamente al carrito una vez que elimino al prod
        const cartFirebase = await cartsRef.doc(idCart)
        const update = await cartFirebase.update({
            products: cart.products
          })
        return deleted
    }
}
