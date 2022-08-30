import express from 'express'

//Controller
import { CartController } from '../controllers/cart.controller.js'

const {Router} = express
const cartRouter = Router()

cartRouter.post('/',(req,res)=>{
    CartController.create(req,res)
})
cartRouter.get('/:id',(req,res)=>{
    CartController.getACart(req,res)
})
cartRouter.delete('/:id',(req,res)=>{
    CartController.delateCart(req,res)
})
cartRouter.get('/:id/productos',(req,res)=>{
    CartController.getProducts(req,res)
})
cartRouter.post('/:id/productos',(req,res)=>{
    CartController.addProductToCart(req,res)
})
cartRouter.delete('/:id/productos',(req,res)=>{
    CartController.deleteAProducts(req,res)
})

export {cartRouter}