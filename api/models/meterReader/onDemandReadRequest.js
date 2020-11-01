"use strict";
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const OnDemandReadRequest = sequelize.define(
    "OnDemandReadRequest",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },

      trans_id: DataTypes.STRING,
      correlationId: DataTypes.STRING,
      statusCode: DataTypes.STRING,
      statusReason: DataTypes.STRING,
      registeredRead: DataTypes.FLOAT,
      readDate: DataTypes.DATE,
      requestTime: DataTypes.DATE,
      // createdAt: {
      //   type: DataTypes.STRING,
      //   //note here this is the guy that you are looking for
      //   get() {
      //     return moment(this.getDataValue("createdAt")).format(
      //       "YYYY-MM-DD hh:mm:ss"
      //     );
      //   },
      // },
      // updatedAt: {
      //   type: DataTypes.STRING,
      //   get() {
      //     return moment(this.getDataValue("updatedAt")).format(
      //       "DD/MM/YYYY h:mm:ss"
      //     );
      //   },
      // },
    },
    {}
  );

  return OnDemandReadRequest;
};
