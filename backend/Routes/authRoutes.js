const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const authMiddleware = require('../Middlewares/authMiddleware');
const rolesMiddleware = require('../Middlewares/roleMiddleware');

router.post('/register',authMiddleware,rolesMiddleware(['Admin']), authController.register);
router.post('/login', authController.login);

module.exports = router;
