// seeders/20231002-seed-serviceinfo.js
'use strict';
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const serviceData = [];
    const serviceTypes = ['Healthcare', 'Food', 'Study Hub', 'Grocery', 'Entertainment'];
    const locations = ['Downtown', 'Uptown', 'Midtown', 'Suburbs', 'Chinatown'];

    for (let i = 0; i < 100; i++) {
      serviceData.push({
        type: faker.random.arrayElement(serviceTypes),
        location: faker.random.arrayElement(locations) + ' ' + faker.address.streetName(),
        userRatings: parseFloat(faker.datatype.float({ min: 0, max: 5, precision: 0.1 })),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('ServiceInfos', serviceData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ServiceInfos', null, {});
  },
};
