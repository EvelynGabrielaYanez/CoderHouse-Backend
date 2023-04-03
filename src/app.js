import express from 'express';
import * as dotEnv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { create } from 'express-handlebars';
import router from './routes/index.routes.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import initializePassport from './configuration/passport.config.js';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

dotEnv.config();

const Handlebars = create({
  helpers: {
    'ifNotEq': function(v1, v2, options) {
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    },
    'ifEq': function(v1, v2, options) {
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    }
  }
});

const app = express();
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Conexión a la base realizada con éxito'))
  .catch((error) => console.log('Se produjo un error al conectarse con la base de datos error: ', error.stack));

// Se define el puerto
const port = process.env.PORT || "8080";

// Se inicia la escucha del servidor
const server = app.listen(port, () => console.log(`Server escuchando en el puerto ${port}`))

// Se definen los middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 210
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', Handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

// Se definen las rutas
app.use('/', express.static(__dirname + '/public'));
app.use(router);
app.all('*', (req, res) => {
  res.status(404).json({
    message: `La ruta ${req.url} y el metodo ${req.method} no estan implementados`
  });
});
