

// const storage = fileSystem
const useStorage =(storage)=>{
    let Products;
    let Carts;
    switch (storage) {
        case 'memory':
            Products = ProductsDaoMemory;
            Carts = CartsDaoMemory
            console.log('Se ejecutara la aplicación con memory');
            break;
        case 'fileSystem':
            Products = ProductsDaoFileSystem;
            Carts = CartsDaoFileSystem;
            console.log('Se ejecutara la aplicación con fileSystem');
            break;
        case 'mongoDB':
            Products = ProductsDaoMongoDB
            Carts = CartsDaoMongoDB 
            console.log('Se ejecutara la aplicación con mongoDB');
            break;
        case 'firebase':
            console.log('Se ejecutara la aplicación con firebase');
            break;
    
        default:
            break;
    }
}