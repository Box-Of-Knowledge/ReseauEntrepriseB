const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const authenticateToken = require('../middleware/authorization');

router.post('/:id',authenticateToken, commentController.create)
router.put('/:id',authenticateToken, commentController.modify)
router.delete('/:id',authenticateToken, commentController.delete)


module.exports = router;