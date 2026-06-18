const express = require('express');
const router = express.Router();

const userController = require('../Controllers/userController');
const authMiddleware = require('../Middlewares/authMiddleware');
const rolesMiddleware = require('../Middlewares/roleMiddleware');

router.post('/create',authMiddleware,rolesMiddleware(['Admin']),userController.createUser);
router.get('/',authMiddleware,rolesMiddleware(['Admin']),userController.getUsers);
router.get('/:id',authMiddleware,rolesMiddleware(['Admin','Manager','Driver']),userController.getUserById);
router.put('/:id',authMiddleware,rolesMiddleware(['Admin','Manager','Driver']),userController.updateUser);
router.delete('/:id',authMiddleware,rolesMiddleware(['Admin']),userController.deleteUser);

module.exports = router;