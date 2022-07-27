import { Carts } from "../container/daos/carritos/models/carts.js";
import { connectMongoDB } from "../container/MongoDbContainer.js";

export class SelectStorageService{
    constructor (storage) {
        this.persistencia = storage;
        this.carts =[]
    }
    storage(persistencia){
        this.persistencia = persistencia.toLowerCase()
    }
    useStorage(){
        console.log(this.persistencia);

        switch (this.persistencia) {
            case 'mongo':
                console.log('El almacenamiento se hará en: mongo');
                this.carts = Carts.find( )
            break;
            case 'memory':
                this.carts = []
                console.log('El almacenamiento se hará en: memory');
            break;
            case 'firebase':
                console.log('El almacenamiento se hará en: mongo');
            break;
            case 'filesystem':
                console.log('El almacenamiento se hará en: file System');
            break;
        
            default:
                console.log(`El valor ingresado no es correcto, por favor utiliza, SelectStorageService.storage() y pasale como parámetro alguno de los siguientes metodos: fileSystem, memory, firebase, mongo`);
                break;
        }
    }

}

// SelectStorageService.createCart()

// class Punto {
//     constructor(x,y){
//       this.x = x;
//       this.y = y;
//     }
//     static imprimir(){
//         this.y = 8;
//         return {x: this.x, y: this.y}
//     }
//   }
  
//   const p1 = new Punto(3,4);
  
//   console.log (Punto.imprimir()); // 7.0710678118654755
// console.log(Punto.y);