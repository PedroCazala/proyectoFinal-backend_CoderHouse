import { FileSystemContainer } from "../../container/FileSystemContainer.js"
import { newId } from "../../funciones.js"

export class ProductsDaoFileSystem extends FileSystemContainer{
    static async getAll(){
        const Products =super.getProductsFile()
        return Products
    }

    static async getOneProductsById(id){
        const Products = super.getProductsFile()
        let product = Products.find(prod=> parseInt(prod.id) == parseInt(id)) 
        return product
    }

    static async pushProduct(newProduct){
        const Products = super.getProductsFile()
        const id = newId(Products)
        const product = {id,...newProduct}
        Products.push(product)
        super.updateProductsFile()
        return product
    }
    static async updateProduct(id, newProduct){
        const Products = super.getProductsFile()
        const oldProduct = Products.find(prod=>prod.id ==id)
        const index = Products.indexOf(oldProduct)
        Products[index] = {...newProduct,id}
        super.updateProductsFile()
    }
    static async delateProduct(id){
        const Products = super.getProductsFile()
        const product = Products.find(prod=>prod.id ==id)
        const index=Products.indexOf(product)
        Products.splice(index,1)
        super.updateProductsFile()
    }
}