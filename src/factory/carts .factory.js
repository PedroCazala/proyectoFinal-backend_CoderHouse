import { CartsDaoFileSystem } from "../DAO/fileSystem/carts.dao.fileSystem.js";
import { CartsDaoFirebase } from "../DAO/Firebase/carts.dao.firebase.js";
import { CartsDaoMemory } from "../DAO/Memory/cart.dao.memory.js";
import { CartsDaoMongo } from "../DAO/mongoDb/cart.dao.mongo.js";
import { SelectStorage } from "./selectStorage.js";

export class CartsFactory extends SelectStorage{
    useStorage(){
        console.log(super.persistencia);

        switch (super.persistencia) {
            case 'mongo':
                console.log('El almacenamiento se hará en: mongo');
                return CartsDaoMongo()
            break;
            case 'memory':
                console.log('El almacenamiento se hará en: memory');
                return CartsDaoMemory()
            break;
            case 'firebase':
                console.log('El almacenamiento se hará en: FIREBASE');
                return CartsDaoFirebase()
            break;
            case 'filesystem':
                console.log('El almacenamiento se hará en: file System');
                return CartsDaoFileSystem()
            break;
        
            default:
                return CartsDaoMongo()
            break;
        }
    }

}
