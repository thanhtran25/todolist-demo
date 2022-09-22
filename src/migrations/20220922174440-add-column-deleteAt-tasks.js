'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Tasks', 'deleted_at', Sequelize.DATE);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Tasks', 'deleted_at');
  }
};
