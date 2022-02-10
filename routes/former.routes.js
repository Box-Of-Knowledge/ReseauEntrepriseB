const router = require('express').Router();
const formController = require('../controllers/former.controller');
const authenticateToken = require('../middleware/authorization');

router.post('/register', formController.register)
router.post('/login', formController.login)
router.get('/infos/:id',authenticateToken, formController.infos)
router.put('/modify/:id',authenticateToken, formController.modify)
router.put('/changePass/:id',authenticateToken, formController.changePassword)
router.delete('/delete',authenticateToken, formController.delete)

router.get('/refresh_token', formController.refresh)
router.get('/delete_token', formController.deleteToken)

router.post('/createForm/:id',authenticateToken, formController.createFormation)
router.get('/formation/:id',authenticateToken, formController.infosFormation)
router.put('/formation/:id',authenticateToken, formController.modifyFormation)
router.delete('/formation/:id',authenticateToken, formController.deleteFormation)


module.exports = router;