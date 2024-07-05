const { DataTypes } = require('sequelize');
const { sequelize } = require('../db'); // Предполагается, что у вас есть файл db.js с настройками Sequelize

const File = sequelize.define('File', {
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mimetype: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = File;