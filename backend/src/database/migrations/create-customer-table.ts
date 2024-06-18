'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      marketplaceId: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      customerZoopId: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      first_name: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      last_name: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      cpf: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Customers');
  }
};
