const { DataTypes } = require('sequelize')
const {sequelize, initializeDatabase} = require('../db')
const Users = require('./User')
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
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    }
})

Users.hasMany(Posts, { foreignKey: 'authorId' })
Posts.belongsTo(Users, { foreignKey: 'authorId' })

module.exports = Posts
