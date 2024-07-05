const fileService = require('../services/fileService');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

class fileController {
    async all(req, res) {
        try {
            const posts = await fileService.getAll();
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        const id = req.params.id;
        try {
            const post = await fileService.findById(id);
            res.json(post);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async upload(req, res, next) {
        console.log(req.file);
        console.log(req.files);
        const urls = [];
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: "No files uploaded" });
            }
            for (const file of req.files) {
                const { path, mimetype, size, originalname } = file;
                const oneFile = {
                    path: '/' + path.replace(/\\/g, '/'),
                    mimetype,
                    size,
                    name: originalname
                };
                const savedFile = await fileService.upload(oneFile);
                urls.push({
                    name: originalname,
                    path: '/' + path.replace(/\\/g, '/'),
                    size
                });
            }
            res.status(200).json({ message: "Files uploaded successfully", files: urls });
        } catch (error) {
            console.error("Error uploading files:", error);
            res.status(500).json({ error: "Error uploading files" });
        }
    }

    async remove(req, res) {
        const id = req.params.id;
        try {
            await fileService.deletePost(id);
            res.json({ message: "Публикация успешно удалена." }).status(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async cropAndSaveImage(req, res) {
        try {
            const result = await fileService.cropAndSaveImage(req.file, req.body.cropperData);
            res.json(result);
        } catch (error) {
            console.error('Error during image processing:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async resizeImage(req, res) {
        try {
            const outputPath = await fileService.resizeImage(req.file, req.body.width, req.body.height);
            res.download(outputPath, async err => {
                if (err) {
                    console.error('Error during file download:', err);
                }
            });
        } catch (error) {
            console.error('Error during image resizing:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new fileController();