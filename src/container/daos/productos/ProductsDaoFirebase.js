import { FirebaseContainer } from '../../FirebaseContainer.js';
import {productsRef} from '../firebaseConfing/confing.js'
 
class ProductsDaoFirebase extends FirebaseContainer{
    //Si id existe, el producto con dicho id se mostrará, sino se mostraran todos
    static async getProducts(req,res){
        const id = req.params.id

        if(id){
            const product = productsRef.doc(id);
            const doc = await product.get();
            if (!doc.exists) {
                res.send(`El documento con el id: ${id} no existe!`);
            } else {
                res.send(JSON.stringify(doc.data()));
            }
        } else {
            const snapshot = await productsRef.get();
            const products = []
            snapshot.forEach(doc => {
                products.push({id:doc.id, data:doc.data()});
            });
            if (!snapshot) {
                res.send(`No hay productos cargados en la colección products!`);
            } else {
                res.send(JSON.stringify(products));
            }
        }
    }
    static async pushProduct(req,res){
        const date = Date.now() 
        const newProduct =req.body
        try {
            const data = ({date,...newProduct})
            const doc = productsRef.doc()
            const resp = await doc.set(data);
        
            res.send(`Producto agregado con exito ${JSON.stringify(resp)}`)
        } catch (error) {
            console.log('entro al catch');
            console.log(error.message);
        }
    }

    static async updateProduct(req,res){
        try {
            const id = req.params.id
            const date = Date.now() 
            const modifiedProduct =req.body
            const data = ({date,...modifiedProduct})
            const doc = productsRef.doc(id)

            try{
                const resp = await doc.update(data);
                res.send(`Producto con id: ${id}, modificado con exito ${JSON.stringify(resp)}`)
            }catch{
                res.send(`No existe ningún porducto con el id: ${id}`)
            }

        } catch (error) {
            console.log('entro al catch "updateProduct"');
            console.log(error.message);
        }
    }
    static async delateProduct(req,res){
        try {
            const id = req.params.id 
            
            const oldProduct = await productsRef.doc(id).get()
            const deleteProduct = await productsRef.doc(id).delete()
            if(oldProduct.exists){
                res.send({oldProduct, deleteProduct})
            }else{
                res.send(`No existe ningún porducto con el id: ${id}`)
            }
        } catch (error) {
            console.log('entro al catch "deleteProduct"');
            console.log(error.message);
        }
    }
}
export default ProductsDaoFirebase