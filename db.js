const CONFIG = require("./config/config");

//* Crear el cliente de mongo
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//* Variable para almacenar la conexión
var db = null;

//========================================================================================
/*                                                                                      *
 *                             CONEXIÓN CON LA BASE DE DATOS                            *
 *                                                                                      */
//========================================================================================


//* Función para conectar con la base de datos
module.exports.connect = () => new Promise((resolve, reject) => {
    const option = { useNewUrlParser: true, useUnifiedTopology: true };

    MongoClient.connect(CONFIG.DB_HOST, option, function(err, result) {
        if (err) { reject(err); return; };
        resolve(result);
        db = result;
    });
});

//* Función para obtener el cliente de MongoDB conectado a la DB
module.exports.get = () => {
    if(!db) throw new Error('La base de datos no está conectada');

    return db;
}

//========================================================================================
/*                                                                                      *
 *                                   AÑADIR DOCUMENTO                                   *
 *                                                                                      */
//========================================================================================

//? collection_name: Nombre de la colección donde se quiere añadir el elemento
//? el: Elemento a añadir
//? res: Respuesta petición express
module.exports.add = (collection_name, req, res) => {
    checkDBConnection(res);

    //? En caso de usar query en lugar de body (cambiarlo también en el validador):
    //? const el = req.query;
    const el            = req.body; 
    el['timestamp']     = new Date();

    this.collection(collection_name).insertOne(el, function( err, result){
        if (err) return res.status(503).send(`Error al añadir el nuevo elemento en la colección ${collection_name}`); 

        console.log(`Elemento añadido correctamente en la colección ${collection_name}`)
        return res.status(200).send(result)
        
    })
}

//========================================================================================
/*                                                                                      *
 *                                  ELIMINAR DOCUMENTO                                  *
 *                                                                                      */
//========================================================================================

//? collection_name: Nombre de la colección de donde se quiere eliminar el documento
//? req: Request petición express
//? res: Respuesta petición express
module.exports.delete = async (collection_name, req, res) => {
    checkDBConnection(res);

    const { id } = req.body;

    this.collection(collection_name).deleteOne(this.mongo_id(id), function (err, result) {
        if (err) return res.status(503).send(`Error al intentar editar el elemento ${id}`); 
        //* Si el documento no existe, enviar estado 422
        if(result.deletedCount < 1) return res.status(422).send(`El elemento que intentas borrar no existe en la colección ${collection_name}`);
        console.log(`Elemento ${id} eliminado correctamente: `, result)
        return res.status(200).send(result);

    }); 
}

//========================================================================================
/*                                                                                      *
 *                                  MODIFICAR DOCUMENTO                                 *
 *                                                                                      */
//========================================================================================

//? collection_name: Nombre de la colección de donde se quiere eliminar el documento
//? id: ID del documento a eliminar
//? updated_el: Documento actualizado
//? res: Respuesta petición express
module.exports.update = (collection_name, req, res) => {
    checkDBConnection(res);

    const EL            = req.body; 
    const ID = EL._id;
    EL['last_modified']     = new Date();
    delete EL._id;

    this.collection(collection_name).updateOne(this.mongo_id(ID), {$set: EL}, function (err, result) {
        if (err) return res.status(503).send(`Error al intentar editar el elemento ${ID}`); 

        //* Si el documento no existe, enviar estado 422
        if(result.modifiedCount < 1) return res.status(422).send(`El elemento que intentas editar no existe en la colección ${collection_name}`);

        console.log(`Elemento ${ID} editado correctamente: `, result)
        return res.status(200).send(result);

    }); 
}

//========================================================================================
/*                                                                                      *
 *                                   LISTADO ELEMENTOS                                  *
 *                                                                                      */
//========================================================================================
module.exports.get_collection = (collection_name, res) =>{
    checkDBConnection(res);

    this.collection(collection_name).find().toArray(function (err, result) {

        if (err) return res.status(503).send(`Error al listar los elementos de la colección ${collection_name}`); 

        return res.status(200).send(result);
        
    }); 
}

//========================================================================================
/*                                                                                      *
 *                                    OTRAS FUNCIONES                                   *
 *                                                                                      */
//========================================================================================

//* Comprueba si la conexión a la base de datos está establecida
function checkDBConnection(res){
    //* Comprobar si hay conexión con la base de datos, si no, salimos
    if (db === null) return res.status(503).send('La conexión con la base de datos no está establecida, asegúrate de que está inicializada en el servidor.'); 
}

//* Devuelve un ID en ObjectID de MongoDB
module.exports.mongo_id = (id) => {return {"_id": mongodb.ObjectId(id)}};

//* Devuelve la colección de MongoDB
module.exports.collection = (collection_name) => db.db(CONFIG.DB_NAME).collection(collection_name);

//* Devuelve el objecto encontrado. Si no lo encuentra, devuelve null
module.exports.doc_found = async (collection_name, search_query) => await this.collection(collection_name).findOne(search_query);



