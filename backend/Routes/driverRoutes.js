const express = require('express');
const router = express.Router();
const driverController = require('../Controllers/driverController');
const authMiddleware = require('../Middlewares/authMiddleware');
const rolesMiddleware = require('../Middlewares/roleMiddleware');

router.get('/me',authMiddleware,rolesMiddleware(['Driver','Admin']),driverController.getProfile);
router.get('/',authMiddleware,rolesMiddleware(['Admin', 'Manager']),driverController.getDriver_List);
router.get('/:id',authMiddleware,rolesMiddleware(['Admin', 'Manager','Driver']),driverController.getDriverById);
router.post('/create',authMiddleware,rolesMiddleware(['Admin']),driverController.createDriver);
router.put('/:id',authMiddleware,rolesMiddleware(['Admin', 'Manager', 'Driver']),driverController.updateDriver);
router.delete('/:id',authMiddleware,rolesMiddleware(['Admin']),driverController.deleteDriver);

module.exports = router;
 