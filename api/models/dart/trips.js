"use strict";
module.exports = (sequelize, DataTypes) => {
  const Trips = sequelize.define(
    "trips",
    {
      trip_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      route_id: DataTypes.INTEGER,
      service_id: DataTypes.INTEGER,
      trip_headsign: DataTypes.TEXT,
      direction_id: DataTypes.INTEGER,
      block_id: DataTypes.INTEGER,
      shape_id: DataTypes.INTEGER
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

  return Trips;
};
