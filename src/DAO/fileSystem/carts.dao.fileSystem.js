import { FileSystemContainer, Carts} from "../../container/FileSystemContainer.js";
import { newId } from "../../funciones.js";

export class CartsDaoFileSystem extends FileSystemContainer{
    static async createCart(cart){
        super.getCartsFile()
        const newCart = {...cart,id:newId(Carts)}
        Carts.push(newCart)
        super.updateCartsFile()
        return newCart
    }
    static async deleteCart(id){
        super.getCartsFile()
        const cart = Carts.find(cart=>cart.id ==id)
        const index=Carts.indexOf(cart)
        Carts.splice(index,1)
        super.updateCartsFile()
    }
    static async getACart(idCart){
        super.getCartsFile()
        const cart = Carts.find(cart=>cart.id ==idCart)
        super.updateCartsFile()
        return cart
    }

    static async addProductToCart(product,idCart){
        try {
            super.getCartsFile()
            const cart = await this.getACart(idCart)
            const update = cart.products.push(product)
            super.updateCartsFile()
            return update
        } catch (error) {
            logger.info('entro al catch');
            logger.info(error);
        }
    }
    static async deleteAProduct(idCart,idProduct){
        super.getCartsFile()
        const cart = await this.getACart(idCart)
        
        let indexCart = Carts.indexOf(cart)
        let product = Carts[indexCart].products.find(prod =>prod.id ==idProduct)
        let indexProduct = cart.products.indexOf(product)

        const deleted = await Carts[indexCart].products.splice(indexProduct,1)
        super.updateCartsFile()
        return deleted
    }
}