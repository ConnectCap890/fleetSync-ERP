const express = require('express');
const router = express.Router();
const vehicleController = require('../Controllers/vehicleController')
const authMiddleware = require ('../Middlewares/authMiddleware')
const rolesMiddleware = require('../Middlewares/roleMiddleware')


router.post('/create', authMiddleware, rolesMiddleware(['Admin']), vehicleController.createVehicle);
router.get('/', authMiddleware,rolesMiddleware(['Admin','Manager']), vehicleController.getVehicles);
router.get('/:id', authMiddleware, rolesMiddleware(['Admin','Manager']), vehicleController.getVehicleById);
router.put('/:id', authMiddleware, rolesMiddleware(['Admin']), vehicleController.updateVehicle);
router.delete('/:id', authMiddleware, rolesMiddleware(['Admin']), vehicleController.deleteVehicle);

module.exports = router;