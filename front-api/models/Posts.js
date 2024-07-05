const { DataTypes } = require('sequelize');
const {sequelize, initializeDatabase} = require('../db');
const User = require('./User');
const Posts = sequelize.define('Posts', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: true
    },
    background_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    authorId: { // Внешний ключ для связи с пользователем
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
});

// Установка связи "один ко многим" между User и Settings
User.hasMany(Posts, { foreignKey: 'authorId' }); // Один пользователь имеет много настроек
Posts.belongsTo(User, { foreignKey: 'authorId' });

module.exports = Posts;
