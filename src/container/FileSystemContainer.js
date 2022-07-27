import fs  from 'fs'
import { logger } from '../logs/log4js.js'
let Products =[]
const fileProducts = 'productos.txt'
let Carts =[]
const fileCarts = 'carritos.txt'
class FileSystemContainer{
    // PRODUCTOS - Traer
    static getProductsFile = ()=>{
        try{
            let archivo = fs.readFileSync(fileProducts, 'utf-8');
            Products = JSON.parse(archivo)
        }catch{
            fs.writeFileSync(fileProducts,'[]')
            logger.info('entro al catch y borro')
        }
    }
    // PRODUCTOS - Actualizar
    static updateProductsFile = ()=>{
        const adsProducts = JSON.stringify(Products)
        fs.writeFileSync(fileProducts,adsProducts)
    }
    //CARRITOS - Traer
    static getCartsFile = ()=>{
        try{
            let archivo = fs.readFileSync(fileCarts, 'utf-8');
            Carts = JSON.parse(archivo)
        }catch{
            fs.writeFileSync(fileCarts,'[]')
            logger.info('entro al catch y borro CARRITO')
        }
    }
    //CARRITOS - Actualizar
    static updateCartsFile = ()=>{
        const adsCarts = JSON.stringify(Carts)
        fs.writeFileSync(fileCarts,adsCarts)
    }
    // static getProducts(){   
    //     try{
    //         let archivo = fs.readFileSync(fileProducts, 'utf-8');
    //         products = JSON.parse(archivo)
    //     }catch{
    //         fs.writeFileSync(fileProducts,'[]')
    //         logger.info('entro al catch y borro')
    //     }
    // }
}
export {Products,fileProducts, Carts,fileCarts,FileSystemContainer}