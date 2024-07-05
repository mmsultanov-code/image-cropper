const PostsService = require('../services/PostsService')
require('dotenv').config()

class settingController {
  	async all(req, res) {
		try {
			const posts = await PostsService.getAll()
			res.json(posts)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
  	}
  	async findById(req, res) {
		const id = req.params.id
		try {
			const post = await PostsService.findById(id)
			res.json(post)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
  	}
	async createPost(req, res) {
		try {
			let postData = req.body;
				postData.authorId = req.userId
			const newPost = await PostsService.create(postData);
			res.status(201).json(newPost);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
	async update(req, res) {
		const id = req.params.id;
		const postData = req.body;
		try {
			const updatedPost = await PostsService.update(id, postData);
			if (updatedPost === 0) {
				return res.status(404).json({ error: "Пост не найден" });
			}
			res.json(updatedPost);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
	async remove(req, res) {
        const id = req.params.id
        try {
            await PostsService.deletePost(id)
            res.json({
				message: "Публикация успешно удалена."
			}).status(204)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
	}
}

module.exports = new settingController()