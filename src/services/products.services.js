//TODO: Aca es donde se pondrá la lógica para que elija la base de datos
import { ProductsDaoFileSystem } from "../DAO/fileSystem/products.dao.fileSystem.js";
import { ProductsDaoFirebase } from "../DAO/Firebase/products.dao.firebase.js";
import { ProductsDaoMemory } from "../DAO/Memory/products.dao.memory.js";
import { ProductsDaoMongo } from "../DAO/mongoDb/products.dao.mongo.js"
import { logger } from "../logs/log4js.js";

// const DAO = ProductsDaoMongo
// const DAO = ProductsDaoMemory
// const DAO = ProductsDaoFileSystem
const DAO = ProductsDaoFirebase

export class ProductsService {
    static async getAllProducts(){
        try {
            const product = await DAO.getAll()
            return product
        } catch (error) {
            logger.info('SERVICE GetAllProducts',error.message);
        } 
    }

    static async getOneProductsById(id){
        try {
            const product = await DAO.getOneProductsById(id)
            return product
        } catch (error) {
            logger.info('SERVICE GetOneProductsById',error.message);
        } 
    }

    static async pushProduct(newProduct){
        try {
            const product = await DAO.pushProduct(newProduct)
            return product
        } catch (error) {
            logger.info('SERVICE PushProduct',error.message);
        } 
    }
    static async updateProduct(id, date, newData){
        try {
            const newProduct = {date,...newData}
            await DAO.updateProduct(id,newProduct)
            const product = await DAO.getOneProductsById(id)
            return product
        } catch (error) {
            logger.info('SERVICE UpdateProduct',error.message);
        } 
    }
    static async delateProduct(id){
        try {
            await DAO.delateProduct(id)
            return true
        } catch (error) {
            logger.info('SERVICE DeleteProduct',error.message);
        } 
    }
}