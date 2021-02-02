"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert(
      "RecipeInstructions",
      [
        {
          stepNumber: "1",
          instructions:
            "In a large bowl, sift together the flour, baking powder, salt and sugar. Make a well in the center and pour in the milk, egg and melted butter; mix until smooth.",
          recipeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          stepNumber: "2",
          instructions:
            "Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.",
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

    return queryInterface.bulkDelete("RecipeInstructions", null, {});
  }
};
