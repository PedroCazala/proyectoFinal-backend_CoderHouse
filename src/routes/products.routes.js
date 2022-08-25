import express from 'express'
import { adminPermission } from '../middlewares.js'

//Controller
import {ProductsController} from '../controllers/product.controller.js'
const Products = ProductsController

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