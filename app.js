//*Importamos las dependencias que utiliza la aplicación
// const CONFIG = require('./config/config.js');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const db = require('./db');
const { tatyc } = require('./tatyc/api/middleware');
const cookie_parser = require('cookie-parser');
const configured = require('./tatyc/configured');

//* Nos conectamos primero a la base de datos. Si no, la aplicación no funcionará
db.connect().then(() => bootApp())
	.catch((e) => { console.error(e); process.exit(1); });

function bootApp(){
	//*Creamos una nueva instancia de la app express
	const app = express();

	app.set('trust proxy', true); //? lo pongo para ver si funciona la IP correctamente, //TODO mirar
	app.use(cookie_parser());
	app.use(tatyc);

	//*Inicializamos los módulos
	app.use(logger('dev')); //?Módulo para generar log de las peticiones que recibe el servidor y verlas por consola
	app.use(express.json()); //?Middleware para traducir las peticiones tipo JSON
	app.use(express.urlencoded({ extended: false })); //?Middleware para decodificar el contenido de los parámetros que vengan codificados

	app.use(express.static(path.join(__dirname, '/build')));
	app.use('/admin', configured, express.static(path.join(__dirname, './tatyc/public/dashboard')));

	//*Se definen las rutas de la aplicación
	const routes = require('./routes/routes');
	app.use('/', routes);

	const user_router = require('./tatyc/users_api/routes');
	app.use('/users', user_router);


	//* La ruta de la página de error 404 (SIEMPRE debe ser la última ruta)
	//TODO crear página 404
	app.use('*', express.static(path.join(__dirname, '/public/404')));

	//* Dejamos a la app escuchando en el puerto especificado
	app.listen(process.env.PORT, () => {
		console.log(`Base de datos conectada y App ejecutándose en modo ${process.env.NODE_ENV} en ${process.env.HOST}:${process.env.PORT}`);
	});
}
