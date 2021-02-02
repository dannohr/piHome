"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("RecipeIngrediants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sortOrder: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      qty: {
        allowNull: true,
        type: Sequelize.STRING
      },
      unit: {
        allowNull: true,
        type: Sequelize.STRING
      },
      name: {
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
    return queryInterface.dropTable("RecipeIngrediants");
  }
};
