const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only .jpeg, .jpg and .png files are allowed!'));
    }
});

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file || !req.body.cropperData) {
            throw new Error('File or Cropper data missing');
        }

        const inputPath = req.file.path;
        const fileExt = path.extname(req.file.originalname);
        const outputPath = `uploads/cropped-${req.file.filename}${fileExt}`;

        const image = sharp(inputPath);

        // Get image metadata to determine original size
        const metadata = await image.metadata();
        const originalWidth = metadata.width;
        const originalHeight = metadata.height;

        // Parse Cropper.js selection data
        const cropperSelection = JSON.parse(req.body.cropperData);
        const { x, y, width, height } = cropperSelection;

        // Calculate coordinates relative to original image size
        const cropX = Math.round(x * (originalWidth / 800));
        const cropY = Math.round(y * (originalHeight / 504));
        const cropWidth = Math.round(width * (originalWidth / 800));
        const cropHeight = Math.round(height * (originalHeight / 504));

        // Crop the original image based on Cropper.js selection
        const croppedImageBuffer = await image
            .extract({ left: Math.round(x), top: Math.round(y), width: Math.round(width), height: Math.round(height) })
            .toBuffer();

        // Save cropped image to file
        await fs.promises.writeFile(outputPath, croppedImageBuffer);

        const blob = Buffer.from(croppedImageBuffer).toString('base64');
        const fileUrl = `/${outputPath}`;

        res.json({
            blob: blob,
            file: fileUrl
        });

        // Cleanup: remove uploaded and cropped image files after response is sent
        setTimeout(async () => {
            try {
                await fs.promises.unlink(inputPath);
                await fs.promises.unlink(outputPath);
            } catch (unlinkErr) {
                console.error('Error during file unlink:', unlinkErr);
            }
        }, 10000); // Delay cleanup to ensure response is fully sent

    } catch (error) {
        console.error('Error during image processing:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/resize', upload.single('image'), async (req, res) => {
    try {
        if (!req.file || !req.body.width || !req.body.height) {
            throw new Error('File or dimensions missing');
        }

        const inputPath = req.file.path;
        const fileExt = path.extname(req.file.originalname);
        const outputPath = `uploads/resized-${req.file.filename}${fileExt}`;

        const width = parseInt(req.body.width);
        const height = parseInt(req.body.height);

        const image = sharp(inputPath);

        // Resize the image proportionally
        await image
            .resize({ width, height, fit: sharp.fit.inside, withoutEnlargement: true })
            .toFile(outputPath);

        // Download the resized image
        res.download(outputPath, async err => {
            if (err) {
                console.error('Error during file download:', err);
            }
            try {
                // Cleanup: remove uploaded and resized image files
                await fs.promises.unlink(inputPath);
                await fs.promises.unlink(outputPath);
            } catch (unlinkErr) {
                console.error('Error during file unlink:', unlinkErr);
            }
        });

    } catch (error) {
        console.error('Error during image resizing:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;