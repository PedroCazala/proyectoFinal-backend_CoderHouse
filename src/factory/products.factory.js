import { ProductsDaoFileSystem } from "../DAO/fileSystem/products.dao.fileSystem.js";
import { ProductsDaoFirebase } from "../DAO/Firebase/products.dao.firebase.js";
import { ProductsDaoMemory } from "../DAO/Memory/products.dao.memory.js";
import { ProductsDaoMongo } from "../DAO/mongoDb/products.dao.mongo.js";
import { logger } from "../logs/log4js.js";
import { SelectStorage } from "./selectStorage.js";

export class ProductsFactory extends SelectStorage{
    static useStorage(){
        switch (super.devolverPersistencia()) {
            case 'mongo':
                logger.warn('El almacenamiento de los productos se hará en: mongo');
                return ProductsDaoMongo
            break;
            case 'memory':
                logger.warn('El almacenamiento de los productos se hará en: memory');
                return ProductsDaoMemory
            break;
            case 'firebase':
                logger.warn('El almacenamiento de los productos se hará en: FIREBASE');
                return ProductsDaoFirebase
            break;
            case 'filesystem':
                logger.warn('El almacenamiento de los productos se hará en: file System');
                return ProductsDaoFileSystem
            break;
        
            default:
                return ProductsDaoMongo
            break;
        }
    }

}