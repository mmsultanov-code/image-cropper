const { DataTypes } = require('sequelize');
const {sequelize, initializeDatabase} = require('../db');
const User = sequelize.define('User', {
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

module.exports = User;
