import { logger } from "../logs/log4js.js"
import { CartsServices } from "../services/carts.services.js"


export class CartController {
    static async create(req,res){
        try{
            await CartsServices.create()
            res.status(200).json({message:`carrito creado`})
        } catch {
            res.status(500).json({message:'No se pudo crear el carrito'})
        }
    }
    static async delateCart(req,res){
        const id = req.params.id
        const cart = await CartsServices.getACart(id)
        await CartsServices.delateCart(id)
        if(cart){
            //llama al servicio
            res.status(200).json({message:`Se borró el carrito con el id: ${id}.`})
        }else{
            //avisa que el id no existe al usuario
            res.status(404).json({mensaje:`No se puede borrar carrito con id: ${id}, porque no existe`})
        }
    }
    static async getProducts(req,res){
        const idCart = req.params.id
        let productsOfCart;
        try {
            productsOfCart = await CartsServices.getProductsOfCart(idCart)
        } catch (error) {
            res.send(`El carrito con el id número: ${idCart}, no existe`)
        }finally{
            res.send(productsOfCart)
        }
    }
    static async addProductToCart(req,res){
        const idCart = req.params.id
        const idProduct = req.body.id

        let productsOfCarts;
        try {
            productsOfCarts = await CartsServices.addProductToCart(idCart,idProduct)
        } catch (error) {
            logger.error(`Entró al catch addProduct cart`);
            logger.error(error);
        }finally{
            res.send(`Se añadió el producto con id ${idProduct} al carrito con el id ${idCart}
            ${productsOfCarts}`)
        }
    }
    static async deleteAProducts(req,res){
        const idCart = req.params.id
        const idProduct = req.body.id
        try {
            await CartsServices.deleteAProducts(idCart,idProduct)
            res.send(`Se eliminó el producto con id ${idProduct} del carrito con el id ${idCart}`)
        } catch (error) {
            res.send(`El producto con id ${idProduct} o carrito con el id ${idCart}, no existen`)
            logger.error(`Entró al catch deleteAProduct cart`);
            logger.error(error.message);
        }
    }
}