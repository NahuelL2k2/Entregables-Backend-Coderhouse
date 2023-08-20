import { Router } from "express"
import ProductManager from "../managers/productsManager.js"
import { __dirname } from "../utils.js"

const router = Router()
const pManager = new ProductManager(__dirname + "/files/products.json")

router.get("/", async (req, res) => {
    const productList = await pManager.getProducts()
    res.render("home", {productList})
})

router.get("/realTimeProducts", async (req, res) =>{
    const productList = await pManager.getProducts()
    res.render("realTimeProducts", {productList})
})

export default router;