'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Posts', 'thumbnail', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Posts', 'background_image', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Posts', 'thumbnail');
    await queryInterface.removeColumn('Posts', 'background_image');
  }
};