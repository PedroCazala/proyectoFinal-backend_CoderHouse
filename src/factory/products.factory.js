import { ProductsDaoFileSystem } from "../DAO/fileSystem/products.dao.fileSystem.js";
import { ProductsDaoFirebase } from "../DAO/Firebase/products.dao.firebase.js";
import { ProductsDaoMemory } from "../DAO/Memory/products.dao.memory.js";
import { ProductsDaoMongo } from "../DAO/mongoDb/products.dao.mongo.js";
import { SelectStorage } from "./selectStorage.js";

export class ProductsFactory extends SelectStorage{
    static useStorage(persistencia){
        console.log(super.persistencia);

        switch (super.persistencia) {
            case 'mongo':
                console.log('El almacenamiento se hará en: mongo');
                return ProductsDaoMongo
            break;
            case 'memory':
                console.log('El almacenamiento se hará en: memory');
                return ProductsDaoMemory
            break;
            case 'firebase':
                console.log('El almacenamiento se hará en: FIREBASE');
                return ProductsDaoFirebase
            break;
            case 'filesystem':
                console.log('El almacenamiento se hará en: file System');
                return ProductsDaoFileSystem
            break;
        
            default:
                return ProductsDaoMongo
            break;
        }
    }

}