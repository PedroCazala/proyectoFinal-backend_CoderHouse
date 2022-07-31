import { Router } from "express";
import { storageController } from "../controllers/storage.controller.js";
import { SelectStorage } from "../factory/selectStorage.js";
 

const StorageRoutes = Router()

StorageRoutes.post('/eleccionDeAlmacenamiento',(req,res) => {
    const storage = req.body.selectStorage
    storageController(storage)
    // const lala = ProductsFactory.useStorage()
    // const nana =CartsFactory.useStorage()
    // const storages = SelectStorage.getInstance()
    // console.log(storage)
    const stg = SelectStorage.storage(storage)
    const persistencia = SelectStorage.devolverPersistencia()
    console.log('persistencia',persistencia); 
    res.redirect('/')
})

export {StorageRoutes}