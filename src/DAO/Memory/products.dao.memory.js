import { newId } from "../../funciones.js"

const Products = [
    {
        "date": 1659125104010,
        "name": "Cuadernillo",
        "description": "Puedes escribir en mí",
        "código": "123456789",
        "img": "https://cdn1.iconfinder.com/data/icons/space-flat-galaxy-radio/512/meteorite-256.png",
        "price": "65000",
        "stock": "155",
        "id": "1"
    },
    {
        "id": 0,
        "date": 1659125091278,
        "name": "Goma",
        "description": "Es para escribir",
        "código": "123456789",
        "img": "https://abanicobazar.com/wp-content/uploads/2018/01/74d33e80-1c82-4e80-aab3-c56a5f675485.jpg",
        "price": "45",
        "stock": "30"
    },
    {
        "id": 2,
        "date": 1659125096749,
        "name": "Lapicera",
        "description": "Es para escribir",
        "código": "123456789",
        "img": "https://abanicobazar.com/wp-content/uploads/2018/01/74d33e80-1c82-4e80-aab3-c56a5f675485.jpg",
        "price": "45",
        "stock": "30"
    }
]
// const Products = []
export class ProductsDaoMemory{
    static async getAll(){
        return Products
    }

    static async getOneProductsById(id){
        let product = Products.find(prod=>prod.id == id)
        return product
    }

    static async pushProduct(newProduct){
        const id = newId(Products)
        const product = {id,...newProduct}
        Products.push(product)
        return product
    }
    static async updateProduct(id, newProduct){
        const oldProduct = Products.find(prod=>prod.id ==id)
        const index = Products.indexOf(oldProduct)
        Products[index] = {...newProduct,id}
    }
    static async delateProduct(id){
        const product = Products.find(prod=>prod.id ==id)
        const index=Products.indexOf(product)
        Products.splice(index,1)
    }
}