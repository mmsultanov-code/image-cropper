const Posts = require('../models/Posts')
const Users = require('../models/User')
const { Op } = require("sequelize");

class PostsService {
	async getAll() {
		return await Posts.findAll({
			include: [{
				model: Users,
				attributes: { exclude: ['name', 'slug', 'content', 'id'] }
			}]
		});
	}
	async findById(id) {
		return await Posts.findByPk(id)
	}
    async create(postData) {
        return await Posts.create(postData);
    }
	async deletePost(id) {
		return await Posts.destroy({where: {id}})
	}
	async update(id, data) {
		return await Posts.update(data, {
			where: {id}
		})
	}
}

module.exports = new PostsService();
