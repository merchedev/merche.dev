const express = require('express');
const router = express.Router();
const router_controller = require('../controllers/router-controller.js')

router.post('/add', router_controller.add)
router.put('/delete', router_controller.delete)
router.put('/update', router_controller.update)
router.get('/list', router_controller.list)

//?Ejemplo con varios Middlewares, si son varios se meten en un array
// router.put('/update', [cup_controller.new_validator, cup_controller.update_validator], router_controller.update)

module.exports = router;