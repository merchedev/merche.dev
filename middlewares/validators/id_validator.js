const check_validation = require('./check_validation')

const { body } = require('express-validator');

//? En caso de usar query en lugar de body:
//? const { query } = require('express-validator');
//? cambiar los métodos body() por query()

const validator_schema = [
        body('_id')
          .isMongoId()
          .withMessage('ID no válida.'),

        check_validation
    ]

    module.exports = validator_schema;