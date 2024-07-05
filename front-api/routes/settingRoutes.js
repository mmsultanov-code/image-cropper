const express = require('express')
const router = express.Router()
const settingController = require('../controllers/SettingController')

router.get('/', settingController.all)
router.get('/:option', settingController.getOption)
router.get('/options/:ids', settingController.getOptions)

module.exports = router
