const express = require('express')
const settingRoutes = require('./settingRoutes')
const postsRoutes = require('./postsRoutes')
const router = express.Router()

router.use('/settings', settingRoutes)
router.use('/posts', postsRoutes)

module.exports = router