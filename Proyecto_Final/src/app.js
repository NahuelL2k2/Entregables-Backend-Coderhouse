import express from "express";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import handlebars from "express-handlebars"
import viewsRouter from "./routers/views.router.js"
import { Server } from "socket.io"
import { __dirname } from "./utils.js";
import ProductManager from "./managers/productsManager.js";

const pManager = new ProductManager(__dirname + "/files/products.json")
const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"))

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const socketServer = new Server(httpServer)
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use("/", viewsRouter)

socketServer.on("connection", async (socket) => {
  console.log("Cliente conectado con id: ", socket.id)
  const productList = await pManager.getProducts({})
  socketServer.emit("sendProducts", productList)
  socket.on("addProduct", async (product) => {
    await pManager.addProduct(product)
    const productList = await pManager.getProducts({})
    socketServer.emit("sendProducts", productList)
  })
  socket.on("deleteProduct", async (id) => {
    await pManager.deleteProduct(id)
    const productList = await pManager.getProducts({})
    console.log("deleteProduct");
    socketServer.emit("sendProducts", productList)
  })
  socket.on("disconnect", () => {
    console.log("El cliente se ha desconectado");
  })
})
