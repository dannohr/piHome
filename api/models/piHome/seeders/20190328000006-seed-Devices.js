"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert(
      "Devices",
      [
        {
          name: "Thermostat",
          ipAddress: "192.168.1.66",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Wifi Outlet #1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Wifi Outlet #2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "LED Lights",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkDelete("Devices", null, {});
  }
};
