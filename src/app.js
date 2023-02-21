import express from 'express';
import { engine } from 'express-handlebars';
import * as dotEnv from 'dotenv';

import { productRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import { socketRouter } from './routes/socket.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from "socket.io";
import ProductManager from './controllers/product/productManager.js';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

dotEnv.config();

const app = express();

// Se define el puerto
const port = process.env.PORT || "8080";

// Se inicia la escucha del servidor
const server = app.listen(port, () => console.log(`Server escuchando en el puerto ${port}`));

// Se definen los middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));


// Socket.io Server
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Cliente conectado");
  socket.on("product/add", async (productData) => {
    try {
      const newProduct = await (new ProductManager().addProduct(productData));
      io.emit("product/add", newProduct);
    } catch (error) {
      console.log(error.message);
    }
  });
  socket.on("product/delete", async (id) => {
    try {
      const newProductList = await (new ProductManager().deleteProduct(id));
      io.emit("product/delete", newProductList);
    } catch (error) {
      console.log(error.message);
    }
  });
});

// Se definen las rutas
app.use('/', express.static(__dirname + '/public'))
app.use('/', socketRouter);
app.use('/realtimeproducts', productRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    message: `La ruta ${req.url} y el metodo ${req.method} no estan implementados`
  });
});