
//*Incluir el fichero con la definición de la BD
var DB = require('../db');
const COLLECTION_NAME = 'nombre_coleccion'; //TODO cambiar por el nombre de la colección

//? AÑADIR NUEVO ELEMENTO
module.exports.add = async (req, res) => DB.add(COLLECTION_NAME, req, res); 

//? ELIMINAR ELEMENTO
module.exports.delete = async (req, res) => DB.delete(COLLECTION_NAME, req, res);

//? MODIFICAR ELEMENTO
module.exports.update = async (req, res) =>  DB.update(COLLECTION_NAME, req, res); 

//? RECIBIR LISTADO DE ELEMENTOS
module.exports.list = async (req, res) => DB.get_collection(COLLECTION_NAME, res);

