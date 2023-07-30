import { promises as fs, writeFile } from "fs"



export default class ProductManager {
    constructor(path) {
        this.path = path
        this.productos = []
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

    async getProducts() {
        try {
            const productosObtenidos = await fs.readFile(this.path, "utf-8")
            return JSON.parse(productosObtenidos)
        } catch (error) {
            console.error("Error al obtener los productos:", error)
            return []
        }
    }

    async showProducts() {
        let productos = await this.getProducts()

        for (let i in productos) {
            console.log(`\nTItulo: ${productos[i].title} \nDescripcion:${productos[i].description} \nPrecio:${productos[i].price} \nThumbnail:${productos[i].thumbnail} \nCodigo:${productos[i].code} \nStock:${productos[i].stock} \n`)
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
        try {
            let productos = await this.getProducts(); 
            const productIndex = productos.findIndex((p) => p.id === productId) // 
            if (productIndex === -1) {
                console.log("Producto no encontrado.")
                return
            }
            const deletedProduct = productos.splice(productIndex, 1)[0]
            await fs.writeFile(this.path, JSON.stringify(productos), "utf8")
            console.log(`${deletedProduct.title} ha sido eliminado.`)
        } catch (error) {
            console.error("Error al eliminar el producto:", error)
        }
    }
    updateProduct = async ({ id, ...product }) => {
        let productos = await this.deleteProduct(id)
        console.log("-----------------------------------------------");
        console.log(productos)
        let productosActualizados = [{ id, ...product }, ...productos]
        await fs.writeFile(this.path, JSON.stringify(productosActualizados, null, 2), "utf8")
    }
}