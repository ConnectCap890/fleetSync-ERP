const experss = require('express');
const router = experss.Router();
const journeyController = require('../Controllers/journeyController');
const authMiddleware = require('../Middlewares/authMiddleware');
const rolesMiddleware = require('../Middlewares/roleMiddleware');

router.post('/create', authMiddleware, rolesMiddleware(['Admin', 'Manager']), journeyController.createJourney);
router.get('/', authMiddleware, rolesMiddleware(['Admin', 'Manager']), journeyController.getJourneys);
router.get('/:id', authMiddleware, rolesMiddleware(['Admin', 'Manager']), journeyController.getJourneyById);
router.put('/:id', authMiddleware, rolesMiddleware(['Admin', 'Manager']), journeyController.updateJourney);
router.delete('/:id', authMiddleware, rolesMiddleware(['Admin']), journeyController.deleteJourney);


module.exports = router;
