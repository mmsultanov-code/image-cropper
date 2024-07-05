'use strict';

const { sequelize } = require('../db');
const File = require('../models/File');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await sequelize.transaction(async (transaction) => {
      await File.bulkCreate([
        {
          path: '/uploads/1caf515ae66e22975406a94fcfa4e77f',
          mimetype: 'image/jpeg',
          size: 55666,
          name: '11.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          path: '/uploads/679d88cdd25f768ea4778b090eb860a4',
          mimetype: 'image/png',
          size: 7388,
          name: 'test.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          path: '/uploads/c10d31637632162b0aaabecbc38d5b75',
          mimetype: 'image/png',
          size: 7388,
          name: 'test.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          path: '/uploads/b1701f4125229106f772af51de05dc23',
          mimetype: 'image/jpeg',
          size: 55666,
          name: '11.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          path: '/uploads/8219fb53f3148d07c3118b8151b6a286',
          mimetype: 'image/jpeg',
          size: 71598,
          name: '48-640x403.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          path: '/uploads/148dfa434a1dca7e73c9b8d524fc7c0a',
          mimetype: 'image/jpeg',
          size: 2644251,
          name: 'passport-2714675_1920.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], { transaction });
    });
  },

  down: async (queryInterface, Sequelize) => {
    await File.destroy({ where: {}, truncate: true });
  }
};