import { logger } from "../logs/log4js.js"
import { sendEmailToAdmin } from "../messages/nodemailer.js"
import { OrderService } from "../services/orders.services.js"

export class OrderController{
    static async generate(req,res){
        try {
            const {idCart} = req.params
            const order = await OrderService.generate(idCart)
            if (order) {
                const html = `
                <h1 style="color:pink;background-color:black; text-align:center;border-radius:15px;padding:5px;">Nueva orden ${order.id} || ${order.dateOrder} </h1>
                <h2>Mail del usuario: ${order.email}</h2>
                <p>Se ha generado una nueva orden, el numero de  orden es el ${order.orderNumber}</p>
                <p>Se debe enviar a  ${order.address}, ${order.city}, ${order.province}</p>
                <h2>Compro los siguientes productos</h2>
                <ul>
                    ${order.products.map(prod => {
                        return`
                            <li> nombre del producto: ${prod.name}, id: ${prod._id}, precio: $${prod.price}, cantidad: ${prod.quantity} </li>
                        `
                    }).join(" ")}
                </ul>
                <p>El precio total es: $${order.totalPrice}</p>
                `
                sendEmailToAdmin({html,subject:'Nueva orden generada'})
                res.status(200).json({message:`La orden se inserto con exito, con el id: ${order._id}`,order})
            }else{
                res.status(404).json({message:`No se pudo guardar la orden`})
            }
        } catch (error) {
            res.status(404).json({message:`No se pudo guardar la orden`,error:error.message})
            
        }
    }
    static async updateState(req,res){
        const {idOrder} = req.params
        const {newState} = req.body
        try {
            const order = await OrderService.updateState({idOrder,newState})
            res.status(200).json({message:`se modificó el estado de la orden con id: ${idOrder}`,newState,order})
        } catch (error) {
            res.status(500).json({message:`No se pudo modificar el estado de la orden con id: ${idOrder}`})
        }
    }

    static async getAll(req,res){
        try {
            const allOrders = await OrderService.getAll()
            res.status(200).json(allOrders)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async getForEmail(req,res){
        const {email} = req.params
        try {
            const allOrders = await OrderService.getForEmail(email)
            if (allOrders[0]) {
                res.status(200).json(allOrders)
            }else{
                res.status(404).json({message:`No hay ordenes con el email: ${email}`})
            }
        } catch (error) {
            res.status(500).json({message:`No se pueden recuperar las ordenes con el email: ${email}`,error:error.message})
        }
    }
}