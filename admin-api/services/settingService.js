const Settings = require('../models/Settings')
const { Op } = require("sequelize");

class SettingService {
	async getAll() {
		return await Settings.findAll()
	}
	async getOptionById(id) {
		return await Settings.findOne({where: {id}})
	}
	async getOptionByName(name) {
		return await Settings.findOne({where: {option_name: name}})
	}
	async getOptionsByIds(ids) {
		return await Settings.findAll({
			where: {
				option_name: ids
			}
		})
	}
	async update(id, data) {
		return await Settings.update(data, {
			where: {id},
			fields: ['option_name', 'option_value']
		})
	}
    async create(data) {
        return await Settings.create(data);
    }
}

module.exports = new SettingService();
