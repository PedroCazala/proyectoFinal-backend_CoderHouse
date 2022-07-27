import { Router } from "express";
import { storageController } from "../controllers/storage.controller.js";

const StorageRoutes = Router()

StorageRoutes.post('/eleccionDeAlmacenamiento',(req,res) => {
    const storage = req.body.selectStorage
    storageController(storage)
    res.redirect('/')
})

export {StorageRoutes}