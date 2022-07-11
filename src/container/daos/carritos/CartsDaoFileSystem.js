import { newId } from '../../../funciones.js'
import { FileSystemContainer,Carts,Products} from '../../FileSystemContainer.js'
class CartsDaoMemory extends FileSystemContainer{
    //crear carrito y devolver su id
    static create(req,res){
        try{
            super.getCartsFile()
            const id = newId(Carts)
            const date = Date.now() 
            const cart = {id,date,products:[]}
            Carts.push(cart)
            super.updateCartsFile()
            res.send(`Carrito creado ${JSON.stringify(cart)}`)
        } catch (error) {
            console.log(`Entró al catch create cart`);
            console.log(error.message);
        }
    }
    //Eliminar un carrito
    static async deleteOne(req,res){
        try {
            super.getCartsFile()
            const id = req.params.id
            const cart = Carts.find(cart=>cart.id ==id)
            const index=Carts.indexOf(cart)
            Carts.splice(index,1)
            if(cart){
                super.updateCartsFile()
                res.send(`Se borró el siguente carrito: ${JSON.stringify(cart)}`)
            }else{
                res.send(`No existía ningún carrito con el id: ${id}`)
            }
        } catch (error) {
            console.log(`Entró al catch deleteOne cart`);
            console.log(error.message);
        }
    } 
    //Ver los productos listados en el carrito
    static getProducts(req,res){
        const id = req.params.id
        try {
            super.getCartsFile()
            let cart = Carts.find(cart=>cart.id==id)
            if(cart){
                super.updateCartsFile()
                res.send(cart.products)
            }else{
                res.send(`El carrito con el id número: ${id}, no existe`)
            }
        } catch (error) {
            console.log(`Entró al catch getProduct cart`);
            console.log(error.message);
        }
    }
    // Agregar determinado producto a determinado carrito
    static async addProduct(req,res){
        try{
            super.getCartsFile()
            super.getProductsFile()
            const idCart = req.params.id
            const idProduct = req.body.id
            let cart = Carts.find(cart=>cart.id==idCart)
            let product = Products.find(prod =>prod.id ==idProduct)
            
            //insert products in cart
            if(cart && product) {
                cart.products.push(product)
                super.updateCartsFile()
                res.send(cart.products)
            } else {
                if(cart){
                    res.send(`El producto con el id número: ${idProduct}, no existe`)
                }else{
                    res.send({
                        error:`El carrito con el id número: ${idCart}, no existe, y/o el producto con el id número: ${idProduct}, no existe`
                    })
                }
            }
        } catch (error) {
            console.log(`Entró al catch addProduct cart`);
            console.log(error.message);
        }
    }
    static deleteAProduct(req,res){
        try{
            super.getCartsFile()
            const idCart = req.params.id
            const idProduct = req.body.id
            let cart = Carts.find(cart=>cart.id==idCart)
            try {
                let indexCart = Carts.indexOf(cart)
                let product = Carts[indexCart].products.find(prod =>prod.id ==idProduct)
                let indexProduct = cart.products.indexOf(product)
                Carts[indexCart].products.splice(indexProduct,1)
                super.updateCartsFile()
                res.send(`El producto con id: ${idProduct} fué eliminado del carrito con id: ${idCart}`)
            } catch {
                res.send({
                    error1:`El carrito con el id número: ${idCart}, no existe o producto con el id número: ${idProduct}, no existe en dicho carrito`
                })
            }
        }
        catch (error){
            console.log(`Entró al catch deleteAProduct cart`);
            console.log(error.message);
        }
    }
}
export default CartsDaoMemory