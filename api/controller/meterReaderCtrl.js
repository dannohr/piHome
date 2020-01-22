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
          [Op.lte]: moment()
        },
        // end date greater than or equal to today
        end: {
          [Op.gte]: moment()
        }
      }
    });

    //Oringinally I thought needed to subtract one day, but now it looks like that's not the case.

    let periodStart = moment(currentPeriod[0].start).subtract(0, "days");

    let periodEnd = moment(currentPeriod[0].end).subtract(0, "days");

    let daysInPeriod =
      moment
        .duration(
          moment(periodEnd, "YYYY-MM-DD").diff(
            moment(periodStart, "YYYY-MM-DD")
          )
        )
        .asDays() + 1;

    // round to no decimal places, the following returned a non interger.  In October got 30.04 instead of 30 days

    daysInPeriod = Math.round(daysInPeriod * 10) / 10;

    console.log("Days in Period are:", daysInPeriod);
    console.log(
      "Dates ",
      periodStart.format("MM-DD-YYYY"),
      " through ",
      periodEnd.format("MM-DD-YYYY")
    );

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
    let consumptionSoFarTodayAsOfTime = null;
    let consumptionSoFarTodayAsOfDate = null;
    let consumptionYesterday = 0;

    let yesterday = moment()
      .add(-1, "days")
      .format("YYYY-MM-DD");
    console.log("yesterday is ", yesterday);

    let dayBeforeYesterday = moment()
      .add(-2, "days")
      .format("YYYY-MM-DD");

    // Find the date/time of the last manual read
    let mostRecentManualReadTime = await db.OnDemand.findAll({
      attributes: [
        [db.sequelize.fn("max", db.sequelize.col("readTime")), "readTime"]
      ],
      raw: true
    });

    await console.log(mostRecentManualReadTime);

    await console.log("xxxxxxxxxxxxxxxxx");
    // Lookup the manual read data for the time found above
    let mostRecentManualReadData = await db.OnDemand.findOne({
      where: { readTime: mostRecentManualReadTime[0].readTime },
      raw: true
    });
    await console.log("xxxxxxxxxxxxxxxxx");

    await console.log(mostRecentManualReadData);

    if (mostRecentManualReadData) {
      let previousDate = mostRecentManualReadData.previousDate;

      let howOldIsLastRead = moment
        .duration(moment().diff(moment(previousDate, "YYYY-MM-DD")))
        .asDays();

      consumptionSoFarTodayAsOfTime = moment(
        mostRecentManualReadData.readTime
      ).format("h:m a");

      consumptionSoFarTodayAsOfDate = moment(
        mostRecentManualReadData.readTime
      ).format("MM/DD");
      console.log("last read is ", howOldIsLastRead);
      //Assign values for yesterday (more than 2 days old wouldn't be yesterday)
      let consumptionSoFarTodayAsOf = null;
      if (howOldIsLastRead < 2) {
        consumptionSoFarToday =
          Math.round(mostRecentManualReadData.consumption * 10) / 10;

        yesterdayData = await db.Daily.findOne({
          where: { meterDate: yesterday },
          raw: true
        });
        console.log("-------------------------------");
        console.log(yesterdayData);
        consumptionYesterday = Math.round(yesterdayData.consumption * 10) / 10;
      }

      if (howOldIsLastRead >= 2 && howOldIsLastRead < 3) {
        console.log(mostRecentManualReadData);
        console.log("Last Read is this old: ", howOldIsLastRead);
        console.log(
          "Read Time: ",
          moment(mostRecentManualReadData.readTime).format("LLLL")
        );
        console.log(
          "Previous Date: ",
          moment(mostRecentManualReadData.previousDate).format("LLLL")
        );
      }

      let beginningOfYesterday = moment(yesterday, "YYYY-MM-DD").startOf("day");
      // .format("LLLL");

      let endOfYesterday = moment(yesterday, "YYYY-MM-DD").endOf("day");
      // .format("LLLL");

      // Don't know now why I originally formatted these, but when I did it caused a deprecation error about date
      // formats in yesterdayLastManualReadTime below

      let yesterdayLastManualReadTime = await db.OnDemand.findAll({
        where: {
          readTime: {
            [Op.between]: [beginningOfYesterday, endOfYesterday]
          }
        },
        attributes: [
          [db.sequelize.fn("max", db.sequelize.col("readTime")), "readTime"]
        ],
        raw: true
      });

      let yesterdayManualReadData = await db.OnDemand.findOne({
        where: { readTime: yesterdayLastManualReadTime[0].readTime },
        raw: true
      });

      console.log("Yesterday Manual Read Data");
      console.log(yesterdayManualReadData);
      console.log("------------------------");

      yesterdayManualReadData
        ? ((consumptionYesterday =
            Math.round(yesterdayManualReadData.consumption * 10) / 10),
          (consumptionSoFarToday =
            Math.round(
              (mostRecentManualReadData.consumption -
                yesterdayManualReadData.consumption) *
                10
            ) / 10))
        : ((consumptionYesterday = 0), (consumptionSoFarToday = 0));
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
        consumptionSoFarTodayAsOfTime: consumptionSoFarTodayAsOfTime,
        consumptionSoFarTodayAsOfDate: consumptionSoFarTodayAsOfDate,
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
