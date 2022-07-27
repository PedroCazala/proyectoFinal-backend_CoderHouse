import { CartService } from "../services/selectStorage"

export class CartController {
    static createCart(req,res){
        try {
            CartService.createCart()
            res.send('carrito creado')
        } catch (error) {
            res.send(error.message)
        }
    }
    static delateCart(req,res){
        const idCart = req.params.id
        if(idCart){
            //llama al servicio
        }else{
            //avisa que el id no existe al usuario
        }
    }
    static getProductsOfCart(req,res){
        const idCart = req.params.id
        if(idCart){
            //llama al servicio
        }else{
            //avisa que el id no existe al usuario
        }
    }
    static addProductOfCart(req,res){
        const idCart = req.params.id
        const idProduct = req.body.id
        if(idCart && idProduct){
            //llama al servicio
        }else{
            //avisa que el id no existe al usuario
        }
    }
    static deleteAProductsOfCart(req,res){
        const idCart = req.params.id
        const idProduct = req.body.id
        if(idCart && idProduct){
            //llama al servicio
        }else{
            //avisa que el id no existe al usuario
        }
    }
}