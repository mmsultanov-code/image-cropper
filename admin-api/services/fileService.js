const File = require('../models/File');
const { Op } = require("sequelize");
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

class FileService {
    async getAll() {
        return await File.findAll({
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt']
            }
        });
    }

    async upload(data) {
        return await File.create(data);
    }

    async cropAndSaveImage(file, cropperData) {
        if (!file || !cropperData) {
            throw new Error('File or Cropper data missing');
        }

        const inputPath = file.path;
        const fileExt = path.extname(file.originalname);
        const outputPath = `uploads/cropped-${file.filename}${fileExt}`;

        const image = sharp(inputPath);

        // Get image metadata to determine original size
        const metadata = await image.metadata();
        const originalWidth = metadata.width;
        const originalHeight = metadata.height;

        // Parse Cropper.js selection data
        const cropperSelection = JSON.parse(cropperData);
        const { x, y, width, height } = cropperSelection;

        // Calculate coordinates relative to original image size
        const cropX = Math.round(x * (originalWidth / 800));
        const cropY = Math.round(y * (originalHeight / 504));
        const cropWidth = Math.round(width * (originalWidth / 800));
        const cropHeight = Math.round(height * (originalHeight / 504));

        // Crop the original image based on Cropper.js selection
        console.log({ metadata: metadata, left: Math.round(x), top: Math.round(y), width: Math.round(width), height: Math.round(height) })
        const croppedImageBuffer = await image
            .extract({ left: Math.round(x), top: Math.round(y), width: Math.round(width), height: Math.round(height) })
            .toBuffer();

        // Save cropped image to file
        await fs.promises.writeFile(outputPath, croppedImageBuffer);

        const blob = Buffer.from(croppedImageBuffer).toString('base64');
        const fileUrl = `/${outputPath}`;

        // Cleanup: remove uploaded and cropped image files after response is sent
        setTimeout(async () => {
            try {
                await fs.promises.unlink(inputPath);
                await fs.promises.unlink(outputPath);
            } catch (unlinkErr) {
                console.error('Error during file unlink:', unlinkErr);
            }
        }, 10000); // Delay cleanup to ensure response is fully sent

        return {
            blob: blob,
            file: fileUrl
        };
    }

    async resizeImage(file, width, height) {
        if (!file || !width || !height) {
            throw new Error('File or dimensions missing');
        }

        const inputPath = file.path;
        const fileExt = path.extname(file.originalname);
        const outputPath = `uploads/resized-${file.filename}${fileExt}`;

        const image = sharp(inputPath);

        // Resize the image proportionally
        await image
            .resize({ width: parseInt(width), height: parseInt(height), fit: sharp.fit.inside, withoutEnlargement: true })
            .toFile(outputPath);

        // Cleanup: remove uploaded and resized image files after response is sent
        setTimeout(async () => {
            try {
                await fs.promises.unlink(inputPath);
                await fs.promises.unlink(outputPath);
            } catch (unlinkErr) {
                console.error('Error during file unlink:', unlinkErr);
            }
        }, 10000); // Delay cleanup to ensure response is fully sent

        return outputPath;
    }
}

module.exports = new FileService();