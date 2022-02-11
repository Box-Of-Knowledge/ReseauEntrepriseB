const router = require('express').Router();
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middleware/authorization');

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/infos/:id',authenticateToken, userController.infos)
router.put('/modify/:id',authenticateToken, userController.modify)
router.put('/changePass/:id',authenticateToken, userController.changePassword)
router.delete('/delete',authenticateToken, userController.delete)

router.get('/refresh_token', userController.refresh)
router.get('/delete_token', userController.deleteToken)
router.post('/formation/register/:id', userController.registerToFormation)

module.exports = router;