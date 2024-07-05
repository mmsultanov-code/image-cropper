const { DataTypes } = require('sequelize');
const {sequelize, initializeDatabase} = require('../db');
const Settings = sequelize.define('Settings', {
    option_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    option_value: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Settings;
