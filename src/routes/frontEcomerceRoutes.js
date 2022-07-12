import { Router } from "express";

const ecommerceRoutes = Router()

ecommerceRoutes.get('/', async (req, res) => {
    res.redirect('http://localhost:8080/api/productos')
    // res.send('algo',productos)
})

export {ecommerceRoutes}