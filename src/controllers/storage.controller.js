import { SelectStorageService } from "../factory/selectStorage.js"

export const storageController =(storage)=>{
    SelectStorageService().storage(storage)
    console.log(almacenamiento.carts)
}