const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const verifyToken = require('../middleware/auth')

router.get('/', verifyToken, userController.getAllUsers)
router.post('/', verifyToken, userController.createUser)
router.get('/:id', verifyToken, userController.getUserById)
router.delete('/:id', verifyToken, userController.deleteUser)
router.put('/:id', verifyToken, userController.update)
router.post('/login', userController.login)

module.exports = router
