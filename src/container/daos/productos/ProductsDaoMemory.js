import { newId } from "../../../funciones.js";
import { logger } from "../../../logs/log4js.js";
import { MemoryContainer, Products} from "../../MemoryContainer.js";

class ProductsDaoMemory extends MemoryContainer{
    //Si id existe, el producto con dicho id se mostrará, sino se mostraran todos
    static async getProducts(req,res){
        const id = req.params.id 
        if(id){
            let finded = Products.find(prod=>prod.id == id)
            finded ?
                res.send(finded)
            :
                res.send(`El producto con el id número: ${id}, no existe`)
        } else {
            const allProducts  = Products;
            if(allProducts[0]){

                res.send(`${JSON.stringify(allProducts)}`)
            }else{
                res.send(`No hay productos cargados`) 
            }
        }
    }
    static async pushProduct(req,res){
        try {
            const id = newId(Products)
            const date = Date.now() 
            const newProduct =req.body
            const addProduct={id,date,...newProduct}
            Products.push(addProduct)
            res.send({addProduct})
        } catch (error) {
            logger.info('entro al catch pushProduct Memory');
            logger.error(error.message);
        }
    }

    static  updateProduct(req,res){
        try {
            const id = parseInt(req.params.id)
            const date = Date.now() 
            const oldProduct = Products.find(prod=>prod.id ==id)
            const newProduct = {id,date,...req.body}
            const index = Products.indexOf(oldProduct)
            logger.info(`INDEX: ${index}`);
            Products[index]=newProduct
            oldProduct?
                res.send(`oldProduct:${JSON.stringify(oldProduct)}, update:${JSON.stringify(newProduct)}`)
            :
                res.send(`No existe ningún porducto con el id: ${id}`)

        } catch (error) {
            logger.info('entro al catch "updateProduct"');
            logger.error(error.message);
        }
    }
    static async delateProduct(req,res){
        try {
            const id = req.params.id 
            const product = Products.find(prod=>prod.id ==id)
            const index=Products.indexOf(product)
            Products.splice(index,1)
            product ?
                res.send(`Se borró el siguente producto: ${JSON.stringify(product)}`)
            :
                res.send(`No existe ningún porducto con el id: ${id}`)
        } catch (error) {
            logger.info('entro al catch "deleteProduct"');
            logger.error(error.message);
        }
    }
}
export default ProductsDaoMemory