const express = require('express')
const userRoutes = require('./userRoutes')
const settingRoutes = require('./settingRoutes')
const postsRoutes = require('./postsRoutes')
const fileRoutes = require('./fileRoutes')
const router = express.Router()

router.use('/users', userRoutes)
router.use('/settings', settingRoutes)
router.use('/posts', postsRoutes)
router.use('/file', fileRoutes)

module.exports = router