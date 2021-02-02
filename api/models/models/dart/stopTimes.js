"use strict";
module.exports = (sequelize, DataTypes) => {
  const StopTimes = sequelize.define(
    "stop_times",
    {
      stop_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      trip_id: DataTypes.INTEGER,
      arrival_time: DataTypes.TEXT,
      departure_time: DataTypes.TEXT,
      stop_id: DataTypes.INTEGER,
      stop_sequence: DataTypes.INTEGER,
      stop_headsign: DataTypes.INTEGER,
      pickup_type: DataTypes.INTEGER,
      drop_off_type: DataTypes.INTEGER,
      shape_dist_traveled: DataTypes.DECIMAL(10, 6),
      timepoint: DataTypes.INTEGER
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

  return StopTimes;
};
