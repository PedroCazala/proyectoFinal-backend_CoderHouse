import {MongoDbContainer, connectMongoDB } from '../../MongoDbContainer.js'
import { Product } from '../productos/models/products.js'
import { Carts } from './models/carts.js'
class CartsDaoMongoDB extends MongoDbContainer{
    //crear carrito y devolver su id
    static async create(req,res){
        connectMongoDB()
        const date = Date.now() 
        const cart = {date,products:[]}
        try {
            // const mongoCart = await Carts.insertOne({...cart}) //Nose porque no funciona
            const mongoCart = await Carts.insertMany([cart])
            
            // res.send(mongoCart._id)
            res.send(mongoCart[0]._id)
        } catch (error) {
            console.log(`Entró al catch create cart`);
            console.log(error.message);
        }
    }
    //Eliminar un carrito
    static async deleteOne(req,res){
        connectMongoDB()
        const id = req.params.id
        try {
            const mongoCart = await Carts.findOne(({_id:id}))
            await Carts.deleteOne({_id:id})
            mongoCart?
                res.send(`Se borró el carrito con el id: ${id}.`)
            :
                res.send({mensaje:`No se puede borrar carrito con id: ${id}, porque no existe`})
        } catch (error) {
            console.log(`Entró al catch deleteOne cart`);
            console.log(error.message);
        }
    } 
    //Ver los productos listados en el carrito
    static async getProducts(req,res){
        connectMongoDB()
        const id = req.params.id
        try {
            let cart;
            try {
                cart = await Carts.findOne({_id:id})
            }catch{
                res.send(`El carrito con el id número: ${id}, no existe`)
            }finally{
                res.send(cart.products)
            }
        } catch (error) {
            console.log(`Entró al catch getProduct cart`);
            console.log(error.message);
        }
    }
    static async addProduct(req,res){
        connectMongoDB()
        const idCart = req.params.id
        const idProduct = req.body.id
        let cart;
        let product;
        try {
            try {
                product = await Product.findOne({_id:idProduct})
                await Carts.findOneAndUpdate({_id:idCart},{$push:{products:product}})
            } catch {
                product=false
            }
            finally{
                try {
                    cart = await Carts.findOne({_id:idCart})
                } catch {
                    cart=false
                }
            }
            if(cart && product){
                res.send(cart.products)
            }else{
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
    static async deleteAProduct(req,res){
        connectMongoDB()
        const idCart = req.params.id
        const idProduct = req.body.id
        try {
            await Carts.findOneAndUpdate({_id:idCart},{products:{$pop:{_id:idProduct}}})
            res.send(`El producto con id: ${idProduct} fué eliminado del carrito con id: ${idCart}`)
            
        } catch (error) {
            res.send({
                error1:`El carrito con el id número: ${idCart}, no existe o producto con el id número: ${idProduct}, no existe en dicho carrito`
            })
            console.log(`Entró al catch deleteAProduct cart`);
            console.log(error.message);
        }
    }
}
export default CartsDaoMongoDB