const express = require('express')
const router = express.Router()
const fileController = require('../controllers/fileController')
const verifyToken = require('../middleware/auth')
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    }
})
const upload = multer({ storage })

router.get('/', verifyToken, fileController.all)
router.post('/', verifyToken, upload.array('files', 5), fileController.upload)
router.post('/upload', upload.single('image'), fileController.cropAndSaveImage);
router.post('/resize', upload.single('image'), fileController.resizeImage);
router.delete('/:id', fileController.remove);

module.exports = router
