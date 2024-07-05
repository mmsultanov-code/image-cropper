const SettingService = require('../services/settingService')
require('dotenv').config()

class settingController {
  	async all(req, res) {
		try {
			const settings = await SettingService.getAll()
			res.json(settings.map((item) => {
				return {
					id: item.id,
					name: item.option_name,
					val: item.option_value,
					createdAt: item.createdAt,
					updatedAt: item.updatedAt
				}
			}))
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
  	}
	async getOptionById(req, res) {
		const id = req.params.id
		console.log('test')
		try {
			const oneOption = await SettingService.getOptionById(id)
			if(!oneOption) {
				res.json({
					message: "option not found",
					status: 404
				})
			} else {
				res.json(oneOption)
			}
		} catch (err) {
			res.status(404).json({error: err.message})
		}
	}
	async getOption(req, res) {
		const option = req.params.option
		try {
			const oneOption = await SettingService.getOptionByName(option)
			if(!oneOption) {
				res.json({
					message: "option not found",
					status: 404
				})
			} else {
				res.json({
					name: oneOption.option_name,
					val: oneOption.option_value
				})
			}
		} catch (err) {
			res.status(404).json({error: err.message})
		}
	}
	async getOptions(req, res) {
		const options = req.params.ids
		try {
			const response = await SettingService.getOptionsByIds(options.split(', '))
			res.json(response.map((item) => {
				return {
					name: item.option_name,
					val: item.option_value
				}
			}) || "options not found")
		} catch (err) {
			res.status(404).json({error: err.message})
		}
	}
	async update(req, res) {
		const id = req.params.id;
		const postData = req.body;
	
		try {
			const updatedSettings = await SettingService.update(id, postData);
			if (updatedSettings === 0) {
				return res.status(404).json({ error: "Настройка не найдена" });
			}
			res.json(updatedSettings);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
	async create(req, res) {
		const optionData = req.body;
		try {
			const newOption = await SettingService.create(optionData);
			res.status(201).json(newOption);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = new settingController()