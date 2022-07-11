import { FirebaseContainer } from '../../FirebaseContainer.js';
import {productsRef,cartsRef,FieldValue} from '../firebaseConfing/confing.js'
class CartsDaoFirebase extends FirebaseContainer{
    //crear carrito y devolver su id
    static async create(req,res){
        const date = Date.now() 
        const cart = {date,products:[]}
        try {
            const firebaseCart = await cartsRef.doc().set(cart)

            res.send(firebaseCart)
        } catch (error) {
            console.log(`Entró al catch create cart`);
            console.log(error.message);
        }
    }
    //Eliminar un carrito
    static async deleteOne(req,res){
        const id = req.params.id
        try {
            const cart = await cartsRef.doc(id).get()
            const deletedCart = await cartsRef.doc(id).delete()
            if(cart.exists){
                res.send(`Se borró el carrito con el id: ${id}. ${JSON.stringify(deletedCart)}`)
            }else{
                res.send({mensaje:`No se puede borrar carrito con id: ${id}, porque no existe`})
            }
        } catch (error) {
            console.log(`Entró al catch deleteOne cart`);
            console.log(error.message);
        }
    } 
    //Ver los productos listados en el carrito
    static async getProducts(req,res){
        const id = req.params.id
        try {
            try {
                const cart = await cartsRef.doc(id).get()
                const products = cart.data().products
                res.send(products)
            }catch(err){
                res.send(`El carrito con el id número: ${id}, no existe`)
                console.log(err.message);
            }
        } catch (error) {
            console.log(`Entró al catch getProduct cart`);
            console.log(error.message);
        }
    }
    static async addProduct(req,res){
        const idCart = req.params.id
        const idProduct = req.body.id
        let cart;
        let product;
        try {
            try {
                product = await productsRef.doc(idProduct).get()
            } catch {
                product=false
            }
            finally{
                try {
                    cart = await cartsRef.doc(idCart).get()
                } catch {
                    cart=false
                }
            }
            if(cart && product){
                // const snapshotCart = cart.data().product
                // snapshotCart = {...snapshotCart,product}
                // const newCart = {...cart.data().products,}
                // const addProduct = cartsRef.doc(idCart).update(newCart)
                const cartRes = await cartsRef.update({
                    products: new FieldValue.arrayUnion(product)
                  });
                res.send('cart.products')
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
    // static async deleteAProduct(req,res){
    //     connectMongoDB()
    //     const idCart = req.params.id
    //     const idProduct = req.body.id
    //     try {
    //         await Carts.findOneAndUpdate({_id:idCart},{products:{$pop:{_id:idProduct}}})
    //         res.send(`El producto con id: ${idProduct} fué eliminado del carrito con id: ${idCart}`)
            
    //     } catch (error) {
    //         res.send({
    //             error1:`El carrito con el id número: ${idCart}, no existe o producto con el id número: ${idProduct}, no existe en dicho carrito`
    //         })
    //         console.log(`Entró al catch deleteAProduct cart`);
    //         console.log(error.message);
    //     }
    // }
}
export default CartsDaoFirebase