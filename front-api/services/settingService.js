const Settings = require('../models/Settings')
const { Op } = require("sequelize");

class SettingService {
	async getAll() {
		return await Settings.findAll()
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
}

module.exports = new SettingService();
