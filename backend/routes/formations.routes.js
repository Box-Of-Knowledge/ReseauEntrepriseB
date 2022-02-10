const router = require('express').Router();
const formationsController = require('../controllers/formations.controller');

router.get('', formationsController.allFormations)
router.get('/UsersFormations/:id', formationsController.userFormations)

module.exports = router;