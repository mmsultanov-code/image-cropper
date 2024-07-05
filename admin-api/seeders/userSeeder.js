'use strict'

const Users = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('demo123', 10)
    await Users.create({
      name: 'Admin Admin',
      email: 'admin@admin.com',
      password: hashedPassword
    })
  },
  down: async (queryInterface, Sequelize) => {
    await Users.destroy({ where: { email: 'admin@admin.com' } })
  }
};