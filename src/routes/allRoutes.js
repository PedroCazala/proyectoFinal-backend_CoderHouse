import { Router } from "express";
import { cartRouter } from "./cart.routes.js";
import { chatRouter } from "./chat.routes.js";
import { ecommerceRoutes } from "./frontEcomerceRoutes.js";
import { orderRouter } from "./order.routes.js";
import { productsRouter } from "./products.routes.js";
import { userProfile } from "./userProfileRoutes.js";


const allRoutes = Router()

//index
allRoutes.get('/',(req,res) => {
    const user = req.user
    res.render('index',{user})
})



//CHAT
allRoutes.use('/chat',chatRouter)

// allRoutes.use('/api', router)
allRoutes.use('/api/productos',productsRouter)
allRoutes.use('/api/carrito',cartRouter)
allRoutes.use('/api/ordenes',orderRouter)
allRoutes.use('/e-commerce',ecommerceRoutes)

// UserProfile login logout register
allRoutes.use('/',userProfile)
//Rutas no encontradas
allRoutes.get('*',(req,res)=>{
    const ruta =req.url
    res.send({error:2, ruta,mensaje:`La ruta ${ruta}, no fué encontrada`})
})

export {allRoutes}