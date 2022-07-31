import { ProductsDaoFileSystem } from "../DAO/fileSystem/products.dao.fileSystem.js";
import { ProductsDaoFirebase } from "../DAO/Firebase/products.dao.firebase.js";
import { ProductsDaoMemory } from "../DAO/Memory/products.dao.memory.js";
import { ProductsDaoMongo } from "../DAO/mongoDb/products.dao.mongo.js";

export class ProductsFactory{
    constructor (storage) {
        this.persistencia = storage;
    }
    storage(persistencia){
        this.persistencia = persistencia.toLowerCase()
    }
    useStorage(){
        console.log(this.persistencia);

        switch (this.persistencia) {
            case 'mongo':
                console.log('El almacenamiento se hará en: mongo');
                return ProductsDaoMongo()
            break;
            case 'memory':
                console.log('El almacenamiento se hará en: memory');
                return ProductsDaoMemory()
            break;
            case 'firebase':
                console.log('El almacenamiento se hará en: FIREBASE');
                return ProductsDaoFirebase()
            break;
            case 'filesystem':
                console.log('El almacenamiento se hará en: file System');
                return ProductsDaoFileSystem()
            break;
        
            default:
                return ProductsDaoMongo()
            break;
        }
    }

}