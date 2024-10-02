// migrations/20241002070047-add-verified-to-fareinfo
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('FareInfos', 'verified', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('FareInfos', 'verified');
  },
};
