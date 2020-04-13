"use strict";
module.exports = (sequelize, DataTypes) => {
  const BillPeriod = sequelize.define(
    "BillPeriod",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },

      start: DataTypes.DATEONLY,
      end: DataTypes.DATEONLY,
      readDate: DataTypes.DATEONLY,
    },
    {}
  );

  return BillPeriod;
};
