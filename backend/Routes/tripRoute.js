const express = require('express');
const router = express.Router();
const tripController = require('../Controllers/tripController');
const authMiddleware = require('../Middlewares/authMiddleware');
const rolesMiddleware = require('../Middlewares/roleMiddleware');

router.get('/active-for-map',authMiddleware,rolesMiddleware(['Admin','Manager','Driver']),tripController.getActiveTripsForMap)
router.post('/create',authMiddleware,rolesMiddleware(['Admin','Manager']),tripController.createTrip);
router.get('/',authMiddleware,rolesMiddleware(['Admin','Manager','Driver']),tripController.getTrip);
router.get('/:id',authMiddleware,rolesMiddleware(['Admin','Manager','Driver']),tripController.getTripById);
router.put('/:id',authMiddleware,rolesMiddleware(['Admin','Manager','Driver']),tripController.updateTrip);
router.delete('/:id',authMiddleware,rolesMiddleware(['Admin']),tripController.deleteTrip)


module.exports = router;