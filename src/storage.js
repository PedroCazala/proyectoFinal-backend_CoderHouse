import { logger } from "./logs/log4js.js";


// const storage = fileSystem
const useStorage =(storage)=>{
    let Products;
    let Carts;
    switch (storage) {
        case 'memory':
            Products = ProductsDaoMemory;
            Carts = CartsDaoMemory
            logger.info('Se ejecutara la aplicación con memory');
            break;
        case 'fileSystem':
            Products = ProductsDaoFileSystem;
            Carts = CartsDaoFileSystem;
            logger.info('Se ejecutara la aplicación con fileSystem');
            break;
        case 'mongoDB':
            Products = ProductsDaoMongoDB
            Carts = CartsDaoMongoDB 
            logger.info('Se ejecutara la aplicación con mongoDB');
            break;
        case 'firebase':
            logger.info('Se ejecutara la aplicación con firebase');
            break;
    
        default:
            break;
    }
}