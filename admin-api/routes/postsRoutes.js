const express = require('express')
const router = express.Router()
const postsController = require('../controllers/postsController')
const verifyToken = require('../middleware/auth')

router.get('/', verifyToken, postsController.all)
router.get('/:id', verifyToken, postsController.findById)
router.post('/', verifyToken, postsController.createPost);
router.put('/:id', verifyToken, postsController.update)
router.delete('/:id', verifyToken, postsController.remove)

module.exports = router
