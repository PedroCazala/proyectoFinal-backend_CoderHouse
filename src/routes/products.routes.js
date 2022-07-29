import express from 'express'
import { adminPermission } from '../middlewares.js'

//Controller
import {ProductsController} from '../controllers/product.controller.js'
const Products = ProductsController
// //Mongo
// import ProductsDaoMongoDB from '../container/daos/productos/ProductsDaoMongoDB.js'
// const Products = ProductsDaoMongoDB
// //Memory
// import ProductsDaoMemory from '../container/daos/productos/ProductsDaoMemory.js'
// const Products = ProductsDaoMemory
// //FileSystem
// import ProductsDaoFileSystem from '../container/daos/productos/ProductsDaoFileSystem.js'
// const Products = ProductsDaoFileSystem
// //FileSystem
// import ProductsDaoFirebase from '../container/daos/productos/ProductsDaoFirebase.js' 
// const Products = ProductsDaoFirebase

const {Router} = express
const productsRouter = Router()

productsRouter.get('/:id?',(req,res)=>{
    Products.getProducts(req,res)
})
productsRouter.post('/', adminPermission,(req,res)=>{
    Products.pushProduct(req,res)
})
productsRouter.put('/:id',adminPermission,(req,res)=>{
    Products.updateProduct(req,res)
})
productsRouter.delete('/:id',adminPermission,(req,res)=>{
    Products.delateProduct(req,res)
})

export {productsRouter}