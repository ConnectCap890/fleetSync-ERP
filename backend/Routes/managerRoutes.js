const express = require('express');
const router = express.Router();

const managerController = require('../Controllers/managerController');
const authMiddleware = require('../Middlewares/authMiddleware');
const rolesMiddleware = require('../Middlewares/roleMiddleware');   

router.get('/me',authMiddleware,rolesMiddleware(['Manager','Admin']),managerController.getProfile);
router.post('/create',authMiddleware,rolesMiddleware(['Admin']),managerController.createManager);
router.get('/',authMiddleware,rolesMiddleware(['Admin']),managerController.getManager_List);
router.get('/:id',authMiddleware,rolesMiddleware(['Admin', 'Manager']),managerController.getManagerById);
router.put('/:id',authMiddleware,rolesMiddleware(['Admin', 'Manager']),managerController.updateManager);
router.delete('/:id',authMiddleware,rolesMiddleware(['Admin']),managerController.deleteManager);

module.exports = router;
