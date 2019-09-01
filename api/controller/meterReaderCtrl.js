const db = require("../models/meterReader/index");
const moment = require("moment");
const { Op, literal } = require("sequelize");

module.exports = {
  get_today(req, res, next) {
    let today = moment().format("YYYY-MM-DD");

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
        .then(data =>
          res.status(200).send({ lastDate: queryDate, dataPoints: data })
        )
        .catch(error => {
          res.status(400).send(error);
        });
    });
  },

  get_this_period_daily_totals(req, res, next) {
    // Look up beginning and end dates for current billing period
    return db.BillPeriod.findAll({
      where: {
        start: {
          [Op.lte]: moment().toDate()
        },
        end: {
          [Op.gte]: moment().toDate()
        }
      }
    }).then(period => {
      let periodStart = moment(period[0].start).subtract(1, "days");
      //.format("YYYY-MM-DD");

      let periodEnd = moment(period[0].end).subtract(1, "days");
      //.format("YYYY-MM-DD");

      // Find Daily date for days in the billing period
      db.Daily.findAll({
        where: {
          meterDate: {
            [Op.gte]: periodStart
          }
        },
        order: [["meterDate", "asc"]],
        attributes: ["meterDate", "startRead", "endRead", "consumption"]
      }).then(data => {
        // Calculate number of days in current billing period
        let daysInPeriod =
          moment
            .duration(
              moment(periodEnd, "YYYY-MM-DD").diff(
                moment(periodStart, "YYYY-MM-DD")
              )
            )
            .asDays() + 1;

        //Calculate the total consumption, using *1 to convert text to number
        let totalConsumption = data.reduce(
          (sum, { consumption }) => sum + consumption * 1,
          0
        );

        let avgDailyConsumption = totalConsumption / data.length;

        // Calculate what average consumption can be for the remaining period and not go over 1,000 kWh per period
        let avgEstReminingConsumption =
          (1000 - totalConsumption) / (daysInPeriod - data.length);

        // Find The last date we have data for

        let dates = data.map(function(x) {
          return new Date(x.meterDate);
          // return moment(x.meterDate);
        });
        // let lastDateWithData = new Date(Math.max.apply(null, dates));
        let lastDate = new Date(Math.max.apply(null, dates));
        let lastDateWithData = lastDate.toDateString(); //.split(" ")[0];

        res.status(200).send({
          billingPeriod: {
            billingStart: periodStart.format("YYYY-MM-DD"),
            billingEnd: periodEnd.format("YYYY-MM-DD"),
            daysInPeriod: daysInPeriod,
            daysIntoPeriod: data.length,
            lastDateWithData: lastDateWithData,
            daysToGoInPeriod: daysInPeriod - data.length,
            totalConsumption: totalConsumption,
            avgDailyConsumption: avgDailyConsumption,
            avgEstReminingConsumption: avgEstReminingConsumption
          },
          data: data
        });
      });
    });
  }
};
