const { validationResult, matchedData } = require('express-validator');
const check_validation = function(req, res, next)  {
	//? Extrae los errores de validación de la petición y los proporciona en un objeto Result.
	const errors = validationResult(req);

	//? Reescribimos body para que solo se puedan añadir los datos del esquema de validación y ningún campo extra más
	//? Esto hace que si se ponen campos que no constan en el validador, simplemente no se añadirán a la base de datos. No dará error
	req.body = matchedData(req, { locations: ['body'], includeOptionals: true });
	req.query = matchedData(req, { locations: ['query'], includeOptionals: true });


	//? Si hay errores, se devuelven como resultado. Si no, continuar con la petición
	if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() }); 
	next();
};
module.exports = check_validation;