"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("RecipeInstructions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stepNumber: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      instructions: {
        allowNull: true,
        type: Sequelize.STRING
      },

      recipeId: {
        onDelete: "CASCADE",
        type: Sequelize.INTEGER,
        references: {
          model: "Recipe",
          key: "id"
        },
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("RecipeInstructions");
  }
};
