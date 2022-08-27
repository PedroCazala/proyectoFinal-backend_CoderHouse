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
        try {
            const productsOfCart = await CartsServices.getProductsOfCart(idCart)
            res.status(200).json(productsOfCart)
        } catch (error) {
            res.status(404).json({message:`El carrito con el id número: ${idCart}, no existe`})
        }
    }
    static async addProductToCart(req,res){
        const idCart = req.params.id
        const idProduct = req.body.id

        try {
            const productsOfCarts = await CartsServices.addProductToCart(idCart,idProduct)
            if(productsOfCarts){
                res.status(200).json({message:`Se añadió el producto con id ${idProduct} al carrito con el id ${idCart}`})
            }else{
                res.status(404).json({error:`El carrito con el id número: ${idCart}, no existe, y/o el producto con el id número: ${idProduct}, no existe`})
            }
        } catch (error) {
            logger.error(`Entró al catch addProduct cart`);
            logger.error(error);
        }
    }
    static async deleteAProducts(req,res){
        const idCart = req.params.id
        const idProduct = req.body.id
        try {
            const deleted = await CartsServices.deleteAProducts(idCart,idProduct)
            deleted ?
                res.status(200).json({message:`Se eliminó el producto con id ${idProduct} del carrito con el id ${idCart}`})
            :
                res.status(404).json({message:`El producto con id ${idProduct} o carrito con el id ${idCart}, no existen`})
        } catch (error) {
            logger.error(`Entró al catch deleteAProduct cart`);
            logger.error(error.message);
        }
    }
}