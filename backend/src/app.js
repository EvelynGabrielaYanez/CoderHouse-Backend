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
import { onError } from './midldlewares/errors/index.js';
import logger from './utils/logger.js';
import { log } from './midldlewares/logger/index.js';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './configuration/swagger.js';
import { swaggerApi } from './utils/constants.js';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//Reviso si el cliente que intenta ingresar a mi servidor esta o no en esta lista
const corsOptions = {
    origin: (origin, callback) => {
      return callback(null, true);
    },
    credentials: true
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors(corsOptions));
app.use(authVerification('jwt'));

app.use(swaggerApi, swaggerUI.serve, swaggerUI.setup(swaggerDocument));

mongoose.connect(env.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info('Conexión a la base realizada con éxito'))
  .catch((error) => logger.info('Se produjo un error al conectarse con la base de datos error: ', error.stack));

// Se definen los middlewares
app.use(passport.initialize());
initializePassport();
app.use(log);

// Se definen las rutas
app.use('/', express.static(__dirname + '/public'));
app.use(router);
app.use(onError);
app.all('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Se inicia la escucha del servidor
app.listen(env.port, () => logger.info(`Server escuchando en el puerto ${env.port}`));