import express from 'express'

//Mongo
import CartsDaoMongoDB from '../container/daos/carritos/CartsDaoMongoDB.js'
const Carts = CartsDaoMongoDB
// //Memory
// import CartsDaoMemory from '../container/daos/carritos/CartsDaoMemory.js' 
// const Carts = CartsDaoMemory
// // FyleSystem
// import CartsDaoFileSystem from '../container/daos/carritos/CartsDaoFileSystem.js'
// const Carts = CartsDaoFileSystem
// // Firebase
// import CartsDaoFirebase from '../container/daos/carritos/CartsDaoFirebase.js'
// const Carts = CartsDaoFirebase
const {Router} = express
const cartRouter = Router()

cartRouter.post('/',(req,res)=>{
    Carts.create(req,res)
})
cartRouter.delete('/:id',(req,res)=>{
    Carts.deleteOne(req,res)
})
cartRouter.get('/:id/productos',(req,res)=>{
    Carts.getProducts(req,res)
})
cartRouter.post('/:id/productos',(req,res)=>{
    Carts.addProduct(req,res)
})
cartRouter.delete('/:id/productos',(req,res)=>{
    Carts.deleteAProduct(req,res)
})
// //Crear carrito
// cartRouter.post('/',(req,res)=>{
//     const id = newId(carts)
//     const date = Date.now() 
//     const cart = {id,date,products:[]}
//     carts.push(cart)
//     updateCarts()
//     res.send({id,cart})
// })

// //Eliminar carrito
// cartRouter.delete('/:id',(req,res)=>{
//     const id = req.params.id
//     let index = carts.map(cart=>parseInt(cart.id)).indexOf(parseInt(id))
//     if(index!=-1){
//         carts.splice(index,1)
//         updateCarts()
//         res.send({index, carts})
//     }else{
//         res.send({mensaje:`No se puede borrar carrito con id: ${id}, porque no existe`})
//     }
// })

//Obtener productos de un carrito

// cartRouter.get('/:id/productos',(req,res)=>{
//     const id = req.params.id
//     let cart =carts.find(cart=> cart.id == id)

//     if(cart){
//         res.send(cart)
//     }else{
//         res.send(`El carrito con el id número: ${id}, no existe`)
//     }
// })
//Agregar producto al carrito en proceso
    //el id del producto se manda por un json
// cartRouter.post('/:id/productos',(req,res)=>{
//     const id = req.params.id
//     let cart =carts.find(cart=> cart.id == id)
//     const idProduct = req.body.id
//     let product = products.find(product=>product.id == idProduct)

//     cart?.products.push(product)

//     if(cart && product){
//         res.send(cart)
//         updateCarts()
//     }else{
//         if(cart){
//             res.send(`El producto con el id número: ${idProduct}, no existe`)
//         }else{
//             res.send({
//                 error1:`El carrito con el id número: ${id}, no existe`,
//                 error2:`Por lo tanto el producto con el id número: ${idProduct}, tampoco existe`
//             })
//         }
//     }
// })
//eliminar un producto de un carrito determinado
// cartRouter.delete('/:id/productos',(req,res)=>{
//     const id = req.params.id
//     let cart =carts.find(cart=> cart.id == id)
//     const idProduct = req.body.id
//     let index = cart.products.map(product=>product.id).indexOf(idProduct)
//     let product = products.find(product=>product.id == idProduct)
//     console.log(index);
//     cart.products.splice(index,1)

//     if(cart && product){
//         res.send({'producto eliminado':product,cart})
//         updateCarts()
//     }else{
//         if(cart){
//             res.send(`El producto con el id número: ${idProduct}, no existe`)
//         }else{
//             res.send({
//                 error1:`El carrito con el id número: ${id}, no existe`,
//                 error2:`Por lo tanto el producto con el id número: ${idProduct}, tampoco existe`
//             })
//         }
//     }
// })

export {cartRouter}