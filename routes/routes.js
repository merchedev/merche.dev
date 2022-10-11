const express = require('express');
const router = express.Router();
const router_controller = require('../controllers/router-controller.js')
const validator = require('../middlewares/validators/validator')
const id_validator = require('../middlewares/validators/id_validator')

router.post('/add', validator, router_controller.add)
router.delete('/delete', id_validator, router_controller.delete)
router.put('/update',  validator, router_controller.update)
router.get('/list', router_controller.list)

//?Ejemplo con varios Middlewares, si son varios se meten en un array
// router.put('/update', [cup_controller.new_validator, cup_controller.update_validator], router_controller.update)

module.exports = router;