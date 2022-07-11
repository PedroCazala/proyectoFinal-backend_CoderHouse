import { newId } from "../../../funciones.js";
import { FileSystemContainer, Products } from "../../FileSystemContainer.js";
class ProductsDaoFileSystem extends FileSystemContainer{
    //Si id existe, el producto con dicho id se mostrará, sino se mostraran todos
    static async getProducts(req,res){
        super.getProductsFile()
        const id = req.params.id
        if(id){
        let finded =Products.find(prod=> parseInt(prod.id) == parseInt(id))
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
            super.getProductsFile()
            const id = newId(Products)
            const date = Date.now() 
            const newProduct =req.body
            const addProduct={id,date,...newProduct}
            Products.push(addProduct)
            super.updateProductsFile()
            res.send({addProduct})
        } catch (error) {
            console.log('entro al catch pushProduct FileSystem');
            console.log(error.message);
        }
    }

    static  updateProduct(req,res){
        try {
            super.getProductsFile()
            const id = parseInt(req.params.id)
            const date = Date.now() 
            const oldProduct = Products.find(prod=>prod.id ==id)
            const newProduct = {id,date,...req.body}
            const index = Products.indexOf(oldProduct)
            Products[index]=newProduct
            if(oldProduct){
                super.updateProductsFile()
                res.send(`oldProduct:${JSON.stringify(oldProduct)}, update:${JSON.stringify(newProduct)}`)
            
            }else{
                res.send(`No existe ningún porducto con el id: ${id}`)
            }

        } catch (error) {
            console.log('entro al catch "updateProduct"');
            console.log(error.message);
        }
    }
    static async delateProduct(req,res){
        try {
            super.getProductsFile()
            const id = req.params.id 
            const product = Products.find(prod=>prod.id ==id)
            const index=Products.indexOf(product)
            Products.splice(index,1)
            if(product){
                super.updateProductsFile()
                res.send(`Se borró el siguente producto: ${JSON.stringify(product)}`)
            }else{
                res.send(`No existe ningún porducto con el id: ${id}`)
            }
        } catch (error) {
            console.log('entro al catch "deleteProduct"');
            console.log(error.message);
        }
    }
}
export default ProductsDaoFileSystem