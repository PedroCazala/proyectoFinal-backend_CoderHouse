import { Router } from "express";
import { cartRouter } from "./cartRoutes.js";
import { productsRouter } from "./productsRoutes.js";
import { userProfile } from "./userProfileRoutes.js";


const allRoutes = Router()

//index
allRoutes.get('/',(req,res) => {
    const user = req.user
    res.render('index',{user})
})

// allRoutes.use('/api', router)
allRoutes.use('/api/productos',productsRouter)
allRoutes.use('/api/carrito',cartRouter)

// UserProfile login logout register
allRoutes.use('/',userProfile)
//Rutas no encontradas
allRoutes.get('*',(req,res)=>{
    const ruta =req.url
    res.send({error:2, ruta,mensaje:`La ruta ${ruta}, no fué encontrada`})
})

export {allRoutes}