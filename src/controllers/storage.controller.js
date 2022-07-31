import { SelectStorage } from "../factory/selectStorage.js"

export const storageController =(storage)=>{
    const almacenamiento = SelectStorage.storage(storage)
    console.log(almacenamiento)
}