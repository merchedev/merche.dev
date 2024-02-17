const check_validation = require('./check_validation');

const { body } = require('express-validator');

//? En caso de usar query en lugar de body:
//? const { query } = require('express-validator');
//? cambiar los métodos body() por query()

const validator_schema = [
	body('_id')
		.optional()
		.isMongoId()
		.withMessage('ID no válida.'),
	body('nombre')
		.isLength({ min: 3, max: 10 })
		.withMessage('El nombre introducido no es válido. Debe tener entre 3 y 10 carácteres'),

	body('edad')
		.isInt({ min: 1, max: 120})
		.withMessage('La edad introducida no es válida. Debe ser un número entre 1 y 120'),

	body('email')
		.isEmail()
		.withMessage('El email introducido no es válido'),

	check_validation
];

module.exports = validator_schema;