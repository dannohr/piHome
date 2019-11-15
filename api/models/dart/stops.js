"use strict";
module.exports = (sequelize, DataTypes) => {
  const Stops = sequelize.define(
    "stops",
    {
      stop_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      stop_code: DataTypes.INTEGER,
      stop_name: DataTypes.TEXT,
      stop_desc: DataTypes.INTEGER,
      stop_lat: DataTypes.DECIMAL(10, 6),
      stop_lon: DataTypes.DECIMAL(10, 6),
      zone_id: DataTypes.INTEGER,
      stop_url: DataTypes.TEXT,
      wheelchair_boarding: DataTypes.INTEGER
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

  return Stops;
};
