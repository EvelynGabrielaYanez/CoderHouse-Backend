import express from 'express';

import * as dotEnv from 'dotenv';

import { productRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

dotEnv.config();

const app = express();

// Se define el puerto
const port = process.env.PORT || "8080";

// Se definen los middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Se definen las rutas
app.use('/static', express.static(__dirname + '/public'));

app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    message: `La ruta ${req.url} y el metodo ${req.method} no estan implementados`
  });
});

// Se inicia la escucha del servidor
app.listen(port, () => console.log(`Server escuchando en el puerto ${port}`))
