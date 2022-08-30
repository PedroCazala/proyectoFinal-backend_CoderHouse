import { logger } from "../logs/log4js.js"
import { ProductsService } from "../services/products.services.js"

export class ProductsController {
    static async getProducts(req, res){
        const id = req.params.id 
        if(id){
            // traerá uno
                const product = await ProductsService.getOneProductsById(id)
            if(product){
                res.status(200).json(product)
            }else{
                res.status(404).json({message:`El producto con el id número: ${id}, no existe`})  
            }
        }else{
            // traerá todos
            const allProducts = await ProductsService.getAllProducts()
            if(allProducts[0]) {
                res.status(200).json(allProducts)
            } else {
                res.status(404).json({message:`No hay productos cargados`})
            }
        }
    }
    static async getProductsForCategory(req, res){
        const {category} = req.params 
        const products = await ProductsService.getProductsForCategory(category)
        if(products){
            res.status(200).json(products)
        }else{
            res.status(404).json({message:`No existen productos con la categoría: ${category}`})  
        }
    }
    static async pushProduct(req, res){
        try {
            const date = new Date().toLocaleString();
            const newProduct ={...req.body,date}
            const save = await ProductsService.pushProduct(newProduct)
            if (save) {
                res.status(200).json(save)
            }else{
                res.status(404).json({message:'El producto NO se guardo'})
            }
        } catch (error){
            // logger.info('error push product', error)
            res.status(404).json({message:'El producto NO se guardo'})
        }
    }
    static async updateProduct(req, res){
        const id = req.params.id
        const date = Date.now()
        const newData = req.body
        const modified = await ProductsService.updateProduct(id,date,newData)
        if (modified) {
            res.status(200).json(modified)
        }else{
            res.status(404).json({message:'El producto NO se actualizo'})
        } 
    }
    static async delateProduct(req, res){
        const id = req.params.id 

        const deleted = await ProductsService.getOneProductsById(id)
        await ProductsService.delateProduct(id)
        if(deleted) {
            res.status(200).json({message:`Product with id ${id} was deleted`})
        } else {
            res.status(404).json({message:`No existe ningún producto con el id: ${id}`})
        }
    }
}