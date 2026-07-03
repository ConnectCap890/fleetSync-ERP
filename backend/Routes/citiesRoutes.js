const express = require('express')
const router = express.Router()

const citiesController = require('../Controllers/citiesController')
const authMiddleware = require('../Middlewares/authMiddleware')
const rolesMiddleware = require('../Middlewares/roleMiddleware')


router.post('/create',authMiddleware,rolesMiddleware(['Admin']),citiesController.createCity)
router.get('/',authMiddleware,rolesMiddleware(['Admin','Manager','Driver']),citiesController.getCities)
router.delete('/:id',authMiddleware,rolesMiddleware(['Admin']),citiesController.deleteCity)

module.exports = router
