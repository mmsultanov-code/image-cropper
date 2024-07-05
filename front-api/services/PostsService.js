const Posts = require('../models/Posts')
const User = require('../models/User')
const { Op } = require("sequelize");

class PostsService {
	async getAll() {
		return await Posts.findAll({
			attributes: { exclude: ['updatedAt', 'background_image', 'id', 'authorId'] },
			include: [{
				model: User,
				attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt'] }
			}]
		});
	}
	async findBySlug(slug) {
		return await Posts.findOne({
			attributes: { exclude: ['updatedAt', 'thumbnail', 'id', 'authorId'] },
			where: {slug},
			include: [{
				model: User,
				attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt'] }
			}]
		})
	}
}

module.exports = new PostsService();
