"use strict";
module.exports = (sequelize, DataTypes) => {
  const RecipeCategory = sequelize.define(
    "RecipeCategory",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      name: DataTypes.STRING
    },
    {}
  );

  RecipeCategory.associate = models => {
    RecipeCategory.hasMany(models.Recipe, {});
  };
  return RecipeCategory;
};
