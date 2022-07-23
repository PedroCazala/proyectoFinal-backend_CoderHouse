import { logger } from '../../../logs/log4js.js';
import {MongoDbContainer, connectMongoDB } from '../../MongoDbContainer.js'
import { Product } from './models/products.js'
class ProductsDaoMongoDB extends MongoDbContainer{
    //Si id existe, el producto con dicho id se mostrará, sino se mostraran todos
    static async getProducts(req,res){
        await connectMongoDB()
        const id = req.params.id 
        if(id){
            let finded;
            try {
                finded = await Product.findOne({_id:id})
            } catch (error) {
                logger.info(error.message);
            } 
            finded ?
                res.send(finded)
            :
                res.send(`El producto con el id número: ${id}, no existe`)
        } else {
            const allProducts  = await Product.find()
            res.send(`${allProducts}`) ||res.send(`No hay productos cargados`) 
        }
    }
    static async pushProduct(req,res){
        try {
            await connectMongoDB()
            const date = Date.now() 
            const newProduct =req.body
            await Product.insertMany([{date,...newProduct}])

            res.send({newProduct})
        } catch (error) {
            logger.info('entro al catch');
            logger.info(error.message);
        }
    }

    static async updateProduct(req,res){
        try {
            connectMongoDB()
            const id = req.params.id
            const date = Date.now() 
            try{
                const modifiedProduct = {id,date,...req.body}
                await Product.updateOne({_id:id},modifiedProduct)
                res.send(modifiedProduct)
            }catch(err){
                res.send(`No existe ningún porducto con el id: ${id}`)
            }

        } catch (error) {
            logger.info('entro al catch "updateProduct"');
            logger.info(error.message);
        }
    }
    static async delateProduct(req,res){
        try {
            connectMongoDB()
            const id = req.params.id 
            try{
                const deleteProduct = await Product.deleteOne({_id:id})
                res.send(deleteProduct)
            }catch{
                res.send(`No existe ningún porducto con el id: ${id}`)
            }
        } catch (error) {
            logger.info('entro al catch "deleteProduct"');
            logger.info(error.message);
        }
    }
}
export default ProductsDaoMongoDB