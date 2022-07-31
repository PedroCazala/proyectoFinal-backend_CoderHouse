import { productsRef } from "../../db/connectFirebase.js";
import { newId } from "../../funciones.js"

// const Products = []
export class ProductsDaoFirebase{
    static async getAll(){
        const snapshot = await productsRef.get();
        let products = []
        snapshot.forEach(doc => {
            products.push({id:doc.id, ...doc.data()});
        });
        return products
    }

    static async getOneProductsById(id){
        const product = productsRef.doc(id);
        const doc = await product.get();
        const data ={...doc.data(),id:doc.id}
        if(doc.data()){ 
            return data
        }
    }

    static async pushProduct(newProduct){
        const doc = productsRef.doc()
        const resp = await doc.set(newProduct);
        return resp
    }
    static async updateProduct(id, newProduct){
        const doc = productsRef.doc(id)
        const resp = await doc.update(newProduct);
    }
    static async delateProduct(id){
        await productsRef.doc(id).delete()
    }
}