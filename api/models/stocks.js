"use strict";
module.exports = (sequelize, DataTypes) => {
  const Stocks = sequelize.define(
    "Stocks",
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
  return Stocks;
};
