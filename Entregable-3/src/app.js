import express from "express"
import ProductManager from "./manager/ProductManager.js"
const app = express()

const PORT = 8080

app.use(express.json())

const manager = new ProductManager("./products.json")

app.get("/products", async (req, res) => {
  const { limit } = req.query
  try {
    const products = await manager.getProducts()
    if (isNaN(limit)){
      res.status(400).json({ message: "El parametro limite debe ser un numero" })
    }
    else if (limit) {
      const limited = products.slice(0, limit)
      res.status(200).json(limited)
    }
    else {
      res.status(200).json(products)
    }
  }
  catch (err) {
    res.status(400).json({ message: `${err}` })
  }


})
app.get("/products/:pid", async (req, res) => {
  const id = parseInt(req.params.pid)
  try {
    if (isNaN(id)) {
      res.status(400).json({ message: "El parametro ingresado debe ser un numero" })
    }
    else {
      const product = await manager.getProductById(id);
      if (product) {
        res.status(200).json(product)
      } else {
        res.status(400).json({ message: "Producto no encontrado" })
      }
    }
  }
  catch (err) {
    res.status(400).json({ message: `${err}` })
  }

})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})