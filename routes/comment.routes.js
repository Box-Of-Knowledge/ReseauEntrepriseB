const router = require('express').Router();
const commentController = require('../controllers/comment.controller');

router.post('/:id', commentController.create)
router.put('/:id', commentController.modify)
router.delete('/:id', commentController.delete)


module.exports = router;