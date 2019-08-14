"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || "development";
var config = require("../../config/sequelizeConfig")[env];
var db = {};

var sequelize = new Sequelize(
  config.meterReader.database,
  config.meterReader.username,
  config.meterReader.password,
  config.meterReader
);

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  // console.log("in the associate");
  if (db[modelName].associate) {
    // console.log(db);
    db[modelName].associate(db);
  }
});

// Following will sync database with Models.
// DO NOT DO THIS is there is data you want to keep.
// sequelize
//   .sync({ force: true })
//   .then(function() {
//     console.log("database sync'd with models");
//   })
//   .catch(function(err) {
//     console.log(err);
//   });
//---------------------------------------------------

db.sequelize = sequelize;

db.Sequelize = Sequelize;

module.exports = db;
