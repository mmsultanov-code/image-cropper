const SettingService = require('../services/settingService')
require('dotenv').config()

class settingController {
  	async all(req, res) {
		try {
			const settings = await SettingService.getAll()
			res.json(settings.map((item) => {
				return {
					name: item.option_name,
					val: item.option_value
				}
			}))
		} catch (error) {
			res.status(500).json({ error: error.message })
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
}

module.exports = new settingController()