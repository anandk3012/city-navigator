// seeders/20231002-seed-fareinfo.js
'use strict';
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fareData = [];
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
    const transportationTypes = ['Bus', 'Auto Rickshaw'];

    for (let i = 0; i < 100; i++) {
      fareData.push({
        city: faker.random.arrayElement(cities),
        transportationType: faker.random.arrayElement(transportationTypes),
        fare: parseFloat(faker.commerce.price(1, 100, 2)),
        lastUpdated: faker.date.recent(30),
        verified: faker.datatype.boolean(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('FareInfos', fareData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FareInfos', null, {});
  },
};
