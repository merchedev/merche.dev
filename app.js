//*Importamos las dependencias que utiliza la aplicación
const CONFIG = require('./config/config.js');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const db = require("./db");
// const cookieParser = require('cookie-parser');

//* Nos conectamos primero a la base de datos. Si no, la aplicación no funcionará
db.connect().then(() => bootApp())
            .catch((e) => { console.error(e); process.exit(1); });

function bootApp(){
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


    //* La ruta de la página de error 404 (SIEMPRE debe ser la última ruta)
    //TODO crear página 404
    app.use('*', express.static(path.join(__dirname, '/public/404')));

    //* Dejamos a la app escuchando en el puerto especificado
    app.listen(CONFIG.PORT, () => {
        console.log(`Base de datos conectada y App ejecutándose en modo ${CONFIG.NODE_ENV} en ${CONFIG.HOST}:${CONFIG.PORT}`)
    })
}
