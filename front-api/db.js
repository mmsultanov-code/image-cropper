const { Sequelize, DataTypes } = require('sequelize')
require("dotenv").config()

const sequelize = new Sequelize({
	dialect: 'postgres',
	host: process.env.DB_HOST || 'localhost',
	database: process.env.DB_NAME || 'test_base_ql',
	username: process.env.DB_USER || 'postgres',
	password: process.env.DB_PASS || 'root',
	port: process.env.DB_PORT || 5432,
})

const initializeDatabase = async () => {
	try {
		await sequelize.sync({ alter: true })
		console.log('All models were synchronized successfully.')
	} catch (error) {
		console.error('Unable to synchronize the models:', error)
	}
};

module.exports = { sequelize, initializeDatabase }
