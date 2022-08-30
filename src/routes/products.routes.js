import express from 'express'
import { adminPermission } from '../middlewares.js'

//Controller
import {ProductsController} from '../controllers/product.controller.js'

const {Router} = express
const productsRouter = Router()

productsRouter.get('/:id?',(req,res)=>{
    ProductsController.getProducts(req,res)
})
productsRouter.get('/categoria/:category',(req,res)=>{
    ProductsController.getProductsForCategory(req,res)
})
productsRouter.post('/', adminPermission,(req,res)=>{
    ProductsController.pushProduct(req,res)
})
productsRouter.put('/:id',adminPermission,(req,res)=>{
    ProductsController.updateProduct(req,res)
})
productsRouter.delete('/:id',adminPermission,(req,res)=>{
    ProductsController.delateProduct(req,res)
})

export {productsRouter}
{/* <form action="/chat/<%= document.getElementById('email').value %>" method="get">
    <p>Ver solo los mail de <%= document.getElementById('email').value %>:</p>
    <button class="btn btn-black" type="submit">Mis mails</button>
</form> */}