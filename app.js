//*Importamos las dependencias que utiliza la aplicación
const CONFIG = require('./config/config.js');
const express = require('express');
const path = require('path');
const logger = require('morgan');
// var cookieParser = require('cookie-parser');

//*Creamos una nueva instancia de la app express
const app = express();

//*Inicializamos los módulos
app.use(logger('dev')); //?Módulo para generar log de las peticiones que recibe el servidor y verlas por consola
app.use(express.json()); //?Middleware para traducir las peticiones tipo JSON
app.use(express.urlencoded({ extended: false })); //?Middleware para decodificar el contenido de los parámetros que vengan codificados
// app.use(cookieParser()); //?Inicializa el módulo para facilitar el tratamiento de cookies
app.use(express.static(path.join(__dirname, '/public')));

//*Se definen las rutas de la aplicación
const routes = require('./routes/routes');
app.use('/', routes);


app.listen(CONFIG.PORT, () => {
    console.log(`App running in ${CONFIG.NODE_ENV} mode at ${CONFIG.HOST}:${CONFIG.PORT}`)
})