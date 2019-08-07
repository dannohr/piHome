const db = require("../models/meterReader/index");
const moment = require("moment");

module.exports = {
  get_today(req, res, next) {
    let today = moment().format("YYYY-MM-DD");
    // let lastDataDate = getLastDayWithData();

    console.log("getting all meter data");
    console.log("today is: ", today);

    return db.Interval.max("startDateTime").then(max => {
      console.log("Last day with data is:");
      console.log(max);
      let queryDate = moment(max).format("YYYY-MM-DD");
      console.log(queryDate);

      db.Interval.findAll({
        where: {
          meterDate: queryDate
        }
      })
        .then(data => res.status(200).send({ lastDate: queryDate, data: data }))
        .catch(error => {
          res.status(400).send(error);
        });
    });
  }
};
