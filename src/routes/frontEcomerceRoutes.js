import { Router } from "express";
import { Product } from "../container/daos/productos/models/products.js";
import fetch from "node-fetch"

const ecommerceRoutes = Router()

ecommerceRoutes.get('/productos', async (req, res) => {
    // res.redirect('http://localhost:8080/api/productos')
    // res.send('algo',productos)
    // const products = ['papa','gato','pera','banana','ratatouille']
    const products = await Product.find()
    // const products = await fetch('http://localhost:8080/api/productos')
//   .then(response => response.json())
//   .then(data => console.log(data));
    // console.log(products);
    // res.send(products)
    res.render('products',{products})
})
// ecommerceRoutes.get('/', async (req, res) => {
//     res.redirect('http://localhost:8080/api/productos')
//     // res.send('algo',productos)
// })

export {ecommerceRoutes}