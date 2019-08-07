"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert(
      "Stocks",
      [
        {
          name: "Amazon",
          symbol: "AMZN",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Apple",
          symbol: "APPL",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkDelete("Stocks", null, {});
  }
};
