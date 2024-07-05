const Users = require('../models/User')

class UserService {
	async getAllUsers() {
		return await Users.findAll()
	}

	async createUser(userData) {
		return await Users.create(userData)
	}

	async getUserById(id) {
		return await Users.findByPk(id)
	}

	async getUserByEmail(email) {
		return await Users.findOne({where: {email}})
	}
	async deleteUser(id) {
		return await Users.destroy({where: {id}})
	}
	async update(id, data) {
		return await Users.update(data, {
			where: {id},
			fields: ['name', 'email']
		})
	}
}

module.exports = new UserService();
