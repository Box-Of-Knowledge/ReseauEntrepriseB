const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/register', userController.register)
router.get('/:id', userController.infos)
router.put('/:id', userController.modify)
router.put('/:id', userController.changePassword)
router.delete('/delete', userController.delete)

module.exports = router;