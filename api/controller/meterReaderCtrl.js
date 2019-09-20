const db = require("../models/meterReader/index");
const moment = require("moment");
const { Op, literal } = require("sequelize");

module.exports = {
  async get_this_period_daily_totals(req, res, next) {
    // Look up beginning and end dates for current billing period

    const currentPeriod = await db.BillPeriod.findAll({
      where: {
        // start date less than or equal to today
        start: {
          [Op.lte]: moment().toDate()
        },
        // end date greater than or equal to today
        end: {
          [Op.gte]: moment().toDate()
        }
      }
    });

    let periodStart = moment(currentPeriod[0].start).subtract(1, "days");

    let periodEnd = moment(currentPeriod[0].end).subtract(1, "days");

    let daysInPeriod =
      moment
        .duration(
          moment(periodEnd, "YYYY-MM-DD").diff(
            moment(periodStart, "YYYY-MM-DD")
          )
        )
        .asDays() + 1;

    const currentPeriodDailyData = await db.Daily.findAll({
      where: {
        meterDate: {
          [Op.gte]: periodStart
        }
      },
      order: [["meterDate", "asc"]],
      attributes: ["meterDate", "startRead", "endRead", "consumption"],
      raw: true //converts what comes back from Sequalize into just a plain object
    });

    let totalConsumption =
      Math.round(
        currentPeriodDailyData.reduce(
          (sum, { consumption }) => sum + consumption * 1,
          0
        ) * 10
      ) / 10;

    // Calcuate average daily consumption
    let avgDailyConsumption =
      Math.round((totalConsumption / currentPeriodDailyData.length) * 10) / 10;

    // Calculate what average consumption can be for the remaining period and not go over 1,000 kWh per period
    let avgEstReminingConsumption =
      Math.round(
        ((1000 - totalConsumption) /
          (daysInPeriod - currentPeriodDailyData.length)) *
          10
      ) / 10;
    //Add Average daily consumption to the data, to be used in the chart
    var dailyData = currentPeriodDailyData.map(function(el) {
      var o = Object.assign({}, el);
      o.avgDailyConsumption = avgDailyConsumption;
      o.avgEstReminingConsumption = avgEstReminingConsumption;
      return o;
    });

    // Find The last date we have data for
    // Create an array of all dates in the data returned from api
    let dates = currentPeriodDailyData.map(function(x) {
      return moment(x.meterDate, "YYYY-MM-DD");
    });

    // Find the max
    let lastDate = Math.max.apply(null, dates);
    let lastDateWithData = moment(lastDate).format("YYYY-MM-DD");

    // Build out daily data array to include the days in the future that are in this period
    // Using this to make sure we show a whole month at a time on the graph, and as days progress
    // more of the month gets filled in.  Can graphically see how far into the month you are.

    let dateToAdd = moment(lastDate)
      .add(1, "days")
      .format("YYYY-MM-DD");

    // Loop through and add the next date to the data set until you get to the last day of the period
    while (
      moment(dateToAdd).format("YYYY-MM-DD") <=
      moment(periodEnd).format("YYYY-MM-DD")
    ) {
      dailyData.push({
        meterDate: dateToAdd,
        avgEstReminingConsumption: avgEstReminingConsumption
      });

      dateToAdd = moment(dateToAdd, "YYYY-MM-DD")
        .add(1, "days")
        .format("YYYY-MM-DD");
    }

    // Daily data always lags a day or two, so we can look at manual real data to fill in the gaps.
    // Yesterday's Daily data (table 'Daily') becomes available at approx 3pm
    // If yesterday's data is already present, we only need to use the manual reads to calcculate today's usage

    let consumptionSoFarToday = 0;
    let consumptionYesterday = 0;

    let yesterday = moment()
      .add(-1, "days")
      .format("YYYY-MM-DD");

    let dayBeforeYesterday = moment()
      .add(-2, "days")
      .format("YYYY-MM-DD");

    let mostRecentManualReadTime = await db.OnDemand.findAll({
      attributes: [
        [db.sequelize.fn("max", db.sequelize.col("readTime")), "readTime"]
      ],
      raw: true
    });

    let mostRecentManualReadData = await db.OnDemand.findOne({
      where: { readTime: mostRecentManualReadTime[0].readTime },
      raw: true
    });

    let previousDate = mostRecentManualReadData.previousDate;

    let howOldIsLastRead = moment
      .duration(moment().diff(moment(previousDate)))
      .asDays();

    //Assign values for yesterday (more than 2 days old wouldn't be yesterday)
    if (howOldIsLastRead < 2) {
      consumptionSoFarToday =
        Math.round(mostRecentManualReadData.consumption * 10) / 10;
      consumptionSoFarTodayAsOf = moment(
        mostRecentManualReadData.readTime
      ).format("h:m a");
    }

    res.status(200).send({
      billingPeriod: {
        billingStart: periodStart.format("YYYY-MM-DD"),
        billingEnd: periodEnd.format("YYYY-MM-DD"),
        daysInPeriod: daysInPeriod,
        daysIntoPeriod: currentPeriodDailyData.length,
        lastDateWithData: lastDateWithData,
        daysToGoInPeriod: daysInPeriod - currentPeriodDailyData.length,
        totalConsumption: totalConsumption,
        avgDailyConsumption: avgDailyConsumption,
        avgEstReminingConsumption: avgEstReminingConsumption,
        consumptionSoFarToday: consumptionSoFarToday,
        consumptionSoFarTodayAsOf: consumptionSoFarTodayAsOf,
        consumptionYesterday: consumptionYesterday
      },
      dailyData: dailyData
    });
  },

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
  }
};
