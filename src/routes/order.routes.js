import express from 'express'
import { OrderController } from '../controllers/order.controller.js'

//Controller


const {Router} = express
const orderRouter = Router()
orderRouter.post('/:idCart', (req,res)=>{
    OrderController.generate(req,res)
})
orderRouter.put('/:idOrder',(req,res)=>{
    OrderController.updateState(req,res)
})
orderRouter.get('/',(req,res)=>{
    OrderController.getAll(req,res)
})
orderRouter.get('/:email',(req,res)=>{
    OrderController.getForEmail(req,res)
})

export {orderRouter}