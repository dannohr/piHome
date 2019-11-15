const db = require("../models/dart/index");
const moment = require("moment");
const { Op, literal } = require("sequelize");

module.exports = {
  get_calendar(req, res, next) {
    let today = moment().format("YYYY-MM-DD");

    console.log("getting Dart data");

    return db.calendar
      .findAll({
        // where: {
        //   meterDate: queryDate
        // }
      })
      .then(data => res.status(200).send({ dataPoints: data }))
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  get_stops(req, res, next) {
    let today = moment().format("YYYY-MM-DD");

    console.log("getting Dart data");

    return db.stops
      .findAll({
        // where: {
        //   meterDate: queryDate
        // }
      })
      .then(data => res.status(200).send({ dataPoints: data }))
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  get_stop_times(req, res, next) {
    let today = moment().format("YYYY-MM-DD");

    console.log("getting Dart data");

    return db.stop_times
      .findAll({
        offset: 0,
        limit: 50
        // where: {
        //   meterDate: queryDate
        // }
      })
      .then(data => res.status(200).send({ dataPoints: data }))
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  get_trips(req, res, next) {
    let today = moment().format("YYYY-MM-DD");

    console.log("getting Dart data");

    return db.trips
      .findAll({
        // offset: 0,
        // limit: 50
        // where: {
        //   meterDate: queryDate
        // }
      })
      .then(data => res.status(200).send({ dataPoints: data }))
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  }
};
