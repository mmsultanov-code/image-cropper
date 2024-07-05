const { DataTypes } = require('sequelize');
const {sequelize, initializeDatabase} = require('../db');
const Users = sequelize.define('Users', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Users;
