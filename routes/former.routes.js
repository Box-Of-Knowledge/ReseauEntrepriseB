const router = require('express').Router();
const formController = require('../controllers/former.controller');

router.post('/register', formController.register)
router.get('/:id', formController.infos)
router.put('/:id', formController.modify)
router.put('/:id', formController.changePassword)
router.delete('/:id', formController.delete)


router.post('/createForm/:id', formController.createFormation)
router.get('/formation/:id', formController.infosFormation)
router.put('/formation/:id', formController.modifyFormation)
router.delete('/formation/:id', formController.deleteFormation)


module.exports = router;