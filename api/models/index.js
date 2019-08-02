"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/config/config.json")[env];
var configElectric = require("../db/sequelizeConfig");
var db = {};

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
var sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

var sequelizeElectric = new Sequelize(
  configElectric.meterReader.database,
  configElectric.meterReader.username,
  configElectric.meterReader.password,
  configElectric.meterReader
);

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    console.log(file);
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });
console.log(db);
Object.keys(db).forEach(modelName => {
  // console.log("in the associate");
  if (db[modelName].associate) {
    // console.log(db[modelName]);
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
