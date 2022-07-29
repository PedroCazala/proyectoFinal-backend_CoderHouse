import { ProductsService } from "../services/products.services.js"

export class ProductsController {
    static async getProducts(req, res){
        const id = req.params.id 
        if(id){
            // traera uno
                const product = await ProductsService.getOneProductsById(id)
            if(product){
                res.send(product)
            }else{
                res.send(`El producto con el id número: ${id}, no existe`)
            }
        }else{
            // traera todos
            const allProducts = await ProductsService.getAllProducts()
            if(allProducts) {
                res.send(allProducts)
            } else {
                res.send(`No hay productos cargados`)
            }
        }
    }
    static async pushProduct(req, res){
        const date = Date.now() 
        const newProduct ={date,...req.body}
        const save = await ProductsService.pushProduct(newProduct)
        if (save) {
            res.send(save)
        }else{
            res.send('El producto NO se guardo')
        }
    }
    static async updateProduct(req, res){
        const id = req.params.id
        const date = Date.now()
        const newData = req.body
        const modified = await ProductsService.updateProduct(id,date,newData)
        console.log(modified);
        if (modified) {
            res.send(modified)
        }else{
            res.send('El producto NO se actualizo')
        } 
    }
    static async delateProduct(req, res){
        const id = req.params.id 
        const deleted = await ProductsService.delateProduct(id)

        if (deleted) {
            res.send(`Product with id ${id} was deleted`)
        } else {
            res.send(`No existe ningún producto con el id: ${id}`)
        }
    }
}