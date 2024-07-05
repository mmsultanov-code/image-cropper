const express = require('express')
const router = express.Router()
const settingController = require('../controllers/SettingController')
const verifyToken = require('../middleware/auth')

router.get('/', verifyToken, settingController.all)
router.get('/edit/:id', verifyToken, settingController.getOptionById)
router.get('/:option', verifyToken, settingController.getOption)
router.get('/options/:ids', verifyToken, settingController.getOptions)
router.put('/:id', verifyToken, settingController.update)
router.post('/', verifyToken, settingController.create)

module.exports = router
