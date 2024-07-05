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
  	async findBySlug(req, res) {
		const slug = req.params.slug
		try {
			const post = await PostsService.findBySlug(slug)
			res.json(post)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
  	}
}

module.exports = new settingController()