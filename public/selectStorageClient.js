// import { SelectStorage } from "../src/services/selectStorage.js";
const form =document.getElementById('formSelectStorage')
const selectStorage = document.getElementById('selectStorage')

let storage = ''
selectStorage.addEventListener('change',
    ()=>{
        storage = selectStorage.value  
        console.log(storage);
        form.submit()
        // SelectStorage.storage(storage)
        // SelectStorage.createCart()
    })
