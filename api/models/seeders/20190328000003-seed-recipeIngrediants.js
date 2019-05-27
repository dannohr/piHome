"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert(
      "RecipeIngrediants",
      [
        {
          sortOrder: 1,
          qty: "1-1/2",
          unit: "cups",
          name: "all-purpose flour",
          recipeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          sortOrder: 2,
          qty: "3 1/2 ",
          unit: "teaspoons",
          name: "baking powder",
          recipeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          sortOrder: 3,
          qty: 1,
          unit: "tsp",
          name: "salt",
          recipeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          sortOrder: 4,
          qty: 1,
          unit: "tablespoon",
          name: "sugar",
          recipeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          sortOrder: 5,
          qty: "1-1/4",
          unit: "cups",
          name: "mils",
          recipeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          sortOrder: 6,
          qty: 1,
          unit: "",
          name: "egg",
          recipeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          sortOrder: 7,
          qty: 3,
          unit: "tablespoon",
          name: "melted butter",
          recipeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkDelete("RecipeIngrediants", null, {});
  }
};
