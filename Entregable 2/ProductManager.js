import { promises as fs, writeFile } from "fs"

class ProductManager {
    constructor() {
        this.path = "./productos.json"
        this.productos = []
    }

    async getProducts() {
        const productosObtenidos = await fs.readFile(this.path, "utf-8")
        let productosParseados = JSON.parse(productosObtenidos)
        return productosParseados
    }

    async showProducts(){
        let productos = await this.getProducts()

        for(let i in productos){
            console.log(`\nTItulo: ${productos[i].title} \nDescripcion:${productos[i].description} \nPrecio:${productos[i].price} \nThumbnail:${productos[i].thumbnail} \nCodigo:${productos[i].code} \nStock:${productos[i].stock} \n`)
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const product = {
            title, description, price, thumbnail, code, stock,
        }

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios.");
            return;

        };

        const codeAdder = this.productos.find((product) => product.code === code)
        if (!codeAdder) {
            if (this.productos.length === 0) {
                product.id = 1
            }
            else {
                product.id = this.productos[this.productos.length - 1].id + 1
            }
            this.productos.push(product)
            console.log("Producto añadido correctamente");
            await fs.writeFile(this.path, JSON.stringify(this.productos), "utf8")
        }
        else {
            return console.log("El ID del producto ya existe")
        }
    }

    getProductById = async (productId) => {
        let productos = await this.getProducts()
        const productID = productos.find((product) => product.id === productId);
        if (productID) {
            console.log(productID)
            return productID
        } else {
            return console.log("Producto no Encontrado")
        }
    }

    async deleteProduct(productId) {
        let productos = await this.getProducts()
        let productoBorrado = productos.find((product) => product.id === productId)
        let productosActualizados = productos.filter((product) => product.id !== productId)
        await fs.writeFile(this.path, JSON.stringify(productosActualizados), "utf8")
        console.log(productoBorrado, "<----- Ha sido eliminado")
        return productosActualizados
    }

    updateProduct = async({id, ...product}) => {
        await this.deleteProduct(id)
        let productos = await this.getProducts()
        let productosActualizados = [{id, ...product}, ...productos]
        await fs.writeFile(this.path, JSON.stringify(productosActualizados), "utf8")
    }
}

// Test

const productTest = new ProductManager

// productTest.addProduct("Titulo de prueba", "Descripción de prueba 1", 10, "Sin ruta", 1010, 21)


// productTest.addProduct("Titulo de prueba", "Descripción de prueba 2", 20, "Sin ruta", 1011, 22)

// productTest.addProduct("Titulo de prueba", "Descripción de prueba", 20, "Sin ruta", 2)


// productTest.addProduct("Titulo de prueba", "Descripción de prueba", 30, "No Route")

productTest.deleteProduct(1)

// productTest.getProductById(1)
// productTest.getProductById(2)
// productTest.getProductById(3)
// productTest.getProductById(4)

productTest.updateProduct({title: "Prueba Actualizacion",
description: "Prueba de Actualización",
price: 500,
thumbnail: "Sin imagen",
code: "abc129",
stock: 25,
id: 2})

// productTest.showProducts()

