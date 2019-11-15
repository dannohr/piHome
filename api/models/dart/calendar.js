"use strict";
module.exports = (sequelize, DataTypes) => {
  const Calendar = sequelize.define(
    "calendar",
    {
      service_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      monday: DataTypes.INTEGER,
      tuesday: DataTypes.INTEGER,
      wednesday: DataTypes.INTEGER,
      thursday: DataTypes.INTEGER,
      friday: DataTypes.INTEGER,
      saturday: DataTypes.INTEGER,
      sunday: DataTypes.INTEGER,
      start_date: DataTypes.INTEGER,
      end_date: DataTypes.INTEGER
    },
    {}
  );

  // Daily.associate = models => {
  //   // Company.hasMany(models.UserCompany, {});
  //   Daily.belongsToMany(models.User, {
  //     through: models.UserCompany
  //   });
  //   Daily.belongsTo(models.Address, {});
  // };

  return Calendar;
};
