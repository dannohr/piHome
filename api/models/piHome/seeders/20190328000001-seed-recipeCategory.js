"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert(
      "RecipeCategory",
      [
        {
          name: "Dinner",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Breakfast",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Bread",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkDelete("RecipeCategory", null, {});
  }
};
