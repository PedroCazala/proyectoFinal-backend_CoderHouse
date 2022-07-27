import { SelectStorageService } from "../services/selectStorage.js"

export const storageController =(storage)=>{
    const almacenamiento = new SelectStorageService()
    almacenamiento.storage(storage)
    almacenamiento.useStorage()
    console.log(almacenamiento.carts)
}