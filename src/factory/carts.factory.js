import { CartsDaoFileSystem } from "../DAO/fileSystem/carts.dao.fileSystem.js";
import { CartsDaoFirebase } from "../DAO/Firebase/carts.dao.firebase.js";
import { CartsDaoMemory } from "../DAO/Memory/cart.dao.memory.js";
import { CartsDaoMongo } from "../DAO/mongoDb/cart.dao.mongo.js";
import { logger } from "../logs/log4js.js";
import { SelectStorage } from "./selectStorage.js";

export class CartsFactory extends SelectStorage{
    static useStorage(){
        switch (super.devolverPersistencia()) {
            case 'mongo':
                logger.warn('El almacenamiento de los carritos se hará en: mongo');
                return CartsDaoMongo
            break;
            case 'memory':
                logger.warn('El almacenamiento de los carritos se hará en: memory');
                return CartsDaoMemory
            break;
            case 'firebase':
                logger.warn('El almacenamiento de los carritos se hará en: FIREBASE');
                return CartsDaoFirebase
            break;
            case 'filesystem':
                logger.warn('El almacenamiento de los carritos se hará en: file System');
                return CartsDaoFileSystem
            break;
        
            default:
                return CartsDaoMongo
            break;
        }
    }

}
