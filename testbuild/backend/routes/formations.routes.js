const router = require('express').Router();
const formationsController = require('../controllers/formations.controller');

router.get('', formationsController.allFormations)

module.exports = router;