import { ProductModel } from '../../models/Products/products.model.mongo.js'

export class ProductsDaoMongo{
    static async getAll(){
        const products = await ProductModel.find()
        return products
    }

    static async getOneProductsById(id){
        const product = await ProductModel.findOne({_id:id})
        return product
    }

    static async pushProduct(newProduct){
        const product = await ProductModel.create(newProduct)
        return product
    }
    static async updateProduct(id, newProduct){
        await ProductModel.updateOne({_id:id}, newProduct)
    }
    static async delateProduct(id){
        await ProductModel.findOneAndDelete({_id:id})     
    }
}