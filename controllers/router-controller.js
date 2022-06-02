const db = require("../db")
const collection = "collection_name"; //TODO cambiar por el nombre de la colección
const CONFIG = require("../config/config");
const { check, validationResult } = require('express-validator');

if(db.get() === null){
    db.connect(CONFIG.DB_HOST, function(err ){
        if(err) throw('Fallo en la conexión con la BD')
    });
}

//========================================================================================
/*                                                                                      *
 *                                      AÑADIR EL                                       *
 *                                                                                      */
//========================================================================================

module.exports.add = function(req, res){
    //* Comprobar si hay conexión con la base de datos, si no, salimos
    if (db.get() === null) return res.status(503).send('La conexión con la base de datos no está establecida, asegúrate de que está inicializada en el servidor.');

    //* Check validations
    //TODO crear o eliminar validadores
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() }); 
 
    const { body } = req;
    const { name, password } = body;
    const new_el = { name, password };

    db.get().db(CONFIG.DB_NAME).collection(collection).insertOne(new_el, function( err, result){
        if (err) return res.status(503).send(`Error al añadir el nuevo elemento`); 

        console.log(`Elemento añadido correctamente`)
        return res.status(200).send(result)
        
    })

}

//========================================================================================
/*                                                                                      *
 *                                     ELIMINAR EL                                      *
 *                                                                                      */
//========================================================================================

module.exports.delete = function(req, res){
    //* Comprobar si hay conexión con la base de datos, si no, salimos
    if (db.get() === null) return res.status(503).send('La conexión con la base de datos no está establecida, asegúrate de que está inicializada en el servidor.');
    
    //* Check validations
    //TODO crear o eliminar validadores
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() }); 

    const { body } = req;
    const { id } = body;

    const ObjectID = require('mongodb').ObjectId; 
    const mongo_el_id = {"_id": ObjectID(id)};

    db.get().db(CONFIG.DB_NAME).collection(collection).deleteOne(mongo_el_id, function (err, result) {
        // Si se produjo un error, enviar el error a la siguiente función
        if (err) return res.status(503).send(`Error al intentar editar el elemento ${id}`); 
        // Si todo fue bien, devolver el resultado al cliente
        console.log(`Elemento ${id} eliminado correctamente: `, result)
        return res.status(200).send(result);

    }); 
}
//========================================================================================
/*                                                                                      *
 *                                      EDITAR EL                                       *
 *                                                                                      */
//========================================================================================

module.exports.update = function(req, res){
    //* Comprobar si hay conexión con la base de datos, si no, salimos
    if (db.get() === null) return res.status(503).send('La conexión con la base de datos no está establecida, asegúrate de que está inicializada en el servidor.'); 
    
    //* Check validations
    //TODO crear o eliminar validadores
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() }); 

    const { body } = req;
    const { id, name, password } = body; //TODO cambiar por las variables correctas

    const ObjectID = require('mongodb').ObjectId; 
    const mongo_el_id = {"_id": ObjectID(id)};

    const updated_el = {$set: { name, password }} //TODO cambiar por las variables correctas

    db.get().db(CONFIG.DB_NAME).collection(collection).updateOne(mongo_el_id, updated_el, function (err, result) {
        //* Si se produjo un error, enviar el error a la siguiente función
        if (err) return res.status(503).send(`Error al intentar editar el elemento ${id}`); 

        //* Si todo fue bien, devolver el resultado al cliente
        console.log(`Elemento ${id} editado correctamente: `, result)
        return res.status(200).send(result);

    }); 
}
//========================================================================================
/*                                                                                      *
 *                                        LISTADO                                       *
 *                                                                                      */
//========================================================================================

module.exports.list = function(req, res){
    if (db.get() === null) return res.status(503).send('La conexión con la base de datos no está establecida, asegúrate de que está inicializada en el servidor.');
    db.get().db(CONFIG.DB_NAME).collection(collection).find().toArray(function (err, result) {

        if (err) res.status(503).send('Error al listar los elementos'); 

        return res.status(200).send(result);
        
    }); 
}

//========================================================================================
/*                                                                                      *
 *                                      VALIDACIÓN                                      *
 *                                                                                      */
//========================================================================================

//? Ejemplo reglas de validación utilizando express validator
// module.exports.validator_name = [
//     check('img', 'Imágen inválida')
//         .isURL(),

//     check('user', 'Usuario no válido')
//         .optional() 
//         .isMongoId(),

//     check('password', 'Contraseña no válida')
//         .isStrongPassword(),
// ]
