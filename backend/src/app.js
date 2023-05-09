import express from 'express';
import env from './configuration/config.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './routes/index.routes.js';
import passport from 'passport';
import initializePassport from './configuration/passport.config.js';
import cors from 'cors';
import { authVerification } from './utils/jwt.js';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const whiteList = ['http://localhost:3000'] //Rutas validas a mi servidor

const corsOptions = { //Reviso si el cliente que intenta ingresar a mi servidor esta o no en esta lista
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by Cors'))
        }
    }
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors(corsOptions));
app.use(authVerification('jwt'));

mongoose.connect(env.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conexión a la base realizada con éxito'))
  .catch((error) => console.log('Se produjo un error al conectarse con la base de datos error: ', error.stack));

// Se definen los middlewares
app.use(cookieParser(process.env.JWT_SECRET));
app.use(passport.initialize());
initializePassport();

// Se definen las rutas
app.use('/', express.static(__dirname + '/public'));
app.use(router);
app.all('*', (req, res) => {
  res.status(404).json({
    message: `La ruta ${req.url} y el metodo ${req.method} no estan implementados`
  });
});

// Se inicia la escucha del servidor
app.listen(env.port, () => console.log(`Server escuchando en el puerto ${env.port}`));