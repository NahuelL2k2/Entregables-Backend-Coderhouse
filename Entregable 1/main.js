class ProductManager{
    constructor(){
        this.productos =[]
    }

    getProducts() {
        return console.log(this.productos)
    }

    addProduct = (title, description, price, thumbail, code, stock) => {
        const product = {
            title, description, price, thumbail, code, stock,
        }

        for (let atributo in product){
            if (product.hasOwnProperty(atributo)){
                if (typeof product[atributo] === "undefined"){
                    return console.log("El objeto tiene uno o varios atributos indefinidos")
                }
            }
        }

        const codeAdder = this.productos.find((product) => product.code === code)
        if (!codeAdder) {
            if (this.productos.length === 0) {
                product.id = 1
            }
            else {
                product.id = this.productos[this.productos.length - 1].id + 1
            }
            this.productos.push(product)
            console.log("El objeto ha sido introducido correctamente")
        }
        else{
            return console.log("El ID del producto ya existe")
        }
    }

    getProductById = (productId) => {
        const productID = this.productos.find((product) => product.id === productId);
        if (productID) {
          return console.log(productID);
        } else {
          return console.log("Not Found");
        }
      }
}

// Test

const productTest = new ProductManager

productTest.addProduct("Titulo de prueba", "Descripción de prueba", 10, "Sin ruta", 0102, 1)


productTest.addProduct("Titulo de prueba", "Descripción de prueba", 20, "Sin ruta", 0103, 2)

productTest.addProduct("Titulo de prueba", "Descripción de prueba", 20, "Sin ruta", 2)


productTest.addProduct("Titulo de prueba", "Descripción de prueba", 30, "No Route")

productTest.getProducts()
productTest.getProductById(1)
productTest.getProductById(2)
productTest.getProductById(3)
productTest.getProductById(4)