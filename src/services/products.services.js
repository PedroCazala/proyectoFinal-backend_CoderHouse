import { ProductsFactory } from "../factory/products.factory.js";
import { logger } from "../logs/log4js.js";

const Factory = ProductsFactory.useStorage()

export class ProductsService {
    static async getAllProducts(){
        try {
            const product = await Factory.getAll()
            return product
        } catch (error) {
            logger.info('SERVICE GetAllProducts',error.message);
        } 
    }

    static async getOneProductsById(id){
        try {
            const product = await Factory.getOneProductsById(id)
            return product
        } catch (error) {
            logger.info('SERVICE GetOneProductsById',error.message);
        } 
    }

    static async pushProduct(newProduct){
        try {
            const product = await Factory.pushProduct(newProduct)
            return product
        } catch (error) {
            logger.info('SERVICE PushProduct',error.message);
        } 
    }
    static async updateProduct(id, date, newData){
        try {
            const newProduct = {date,...newData}
            await Factory.updateProduct(id,newProduct)
            const product = await Factory.getOneProductsById(id)
            return product
        } catch (error) {
            logger.info('SERVICE UpdateProduct',error.message);
        } 
    }
    static async delateProduct(idCart,idProduct){
        try {
            const deleted = await Factory.delateProduct(idCart,idProduct)
            return deleted
        } catch (error) {
            logger.info('SERVICE DeleteProduct',error.message);
        } 
    }
}