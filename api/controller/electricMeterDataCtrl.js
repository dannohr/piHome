const db = require('../models/meterReader/index');
const moment = require('moment');
const https = require('https');
const axios = require('axios');
const fs = require('fs');
const { Op, literal } = require('sequelize');

const smtUrl = process.env.smtUrl;
const smtUserName = process.env.smtUserName;
const smtPassword = process.env.smtPassword;
const smtEsiid = process.env.smtEsiid;

const instance = axios.create({
  httpsAgent: new https.Agent({
    cert: fs.readFileSync('./config/certs/cert.pem'),
    key: fs.readFileSync('./config/certs/privkey.pem'),
    rejectUnauthorized: false,
  }),
});

const smtApiPost = async (body, site) => {
  return await instance({
    method: 'post',
    url: smtUrl + site,
    data: body,

    auth: {
      username: smtUserName,
      password: smtPassword,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const getYesterdayUsage = async () => {};

module.exports = {
  async get_period_date_rage(req, res, next) {
    console.log(req.params.date);

    let dateToUse = req.params.date
      ? moment(req.params.date).subtract(0, 'days').format('YYYY-MM-DD')
      : moment();

    console.log('Date using for lookup', dateToUse);

    const currentPeriod = await db.BillPeriod.findAll({
      where: {
        // start date less than or equal to today
        start: {
          [Op.lte]: dateToUse,
        },
        // end date greater than or equal to today
        end: {
          [Op.gte]: dateToUse,
        },
      },
      raw: true,
    });

    console.log('-----------------------------------------------');
    console.log(currentPeriod);
    console.log('-----------------------------------------------');

    let periodStart = moment(currentPeriod[0].start).subtract(0, 'days');

    let periodEnd = moment(currentPeriod[0].end).subtract(0, 'days');

    let daysInPeriod =
      moment
        .duration(moment(periodEnd, 'YYYY-MM-DD').diff(moment(periodStart, 'YYYY-MM-DD')))
        .asDays() + 1;

    // round to no decimal places, the following returned a non interger.  In October 2019 got 30.04 instead of 30 days

    daysInPeriod = Math.round(daysInPeriod * 10) / 10;

    console.log('Days in Period are:', daysInPeriod);
    console.log(
      'Dates ',
      periodStart.format('MM-DD-YYYY'),
      ' through ',
      periodEnd.format('MM-DD-YYYY')
    );

    return res.status(200).send({
      billingPeriod: {
        billingStart: periodStart.format('YYYY-MM-DD'),
        billingEnd: periodEnd.format('YYYY-MM-DD'),
        daysInPeriod: daysInPeriod,
      },
    });
  },

  async get_period_daily_data(req, res, next) {
    // Define the starting and ending dates.  If the ending date is after today
    // use today's date or the Smart Meter API will reject the request
    let startDate = req.body.data.startDate;
    let endDate = req.body.data.endDate;
    let apiEndDate = !moment(endDate, 'MM/DD/YYYY').isBefore(moment(), 'day')
      ? moment().format('MM/DD/YYYY')
      : endDate;

    let body = {
      trans_id: '123',
      requestorID: smtUserName,
      requesterType: 'RES',
      startDate: startDate,
      endDate: apiEndDate,
      reportFormat: 'JSON',
      version: 'L',
      readingType: 'c',
      esiid: [smtEsiid],
      SMTTermsandConditions: 'Y',
    };
    const responseData = await smtApiPost(body, 'dailyreads/');

    console.log(' -----> The response data is');
    // console.log(responseData);

    // // Array of the daily meter read data
    let dailyData = responseData.registeredReads;
    daysIntoPeriod = dailyData.length;
    console.log(dailyData);

    let lastDateWithData = dailyData[dailyData.length - 1].readDate;
    console.log(lastDateWithData);

    // // Sum the consumption between the starting and ending dates
    let totalConsumption = dailyData.reduce(function (a, b) {
      return a + b.energyDataKwh * 1;
    }, 0);

    let avgDailyConsumption = (totalConsumption / dailyData.length).toFixed(3);
    let reminingConsumption = Math.max(0, 1000 - totalConsumption).toFixed(3);

    // // Remaining days in the period, with no data provided by API
    let numDaysMissingData = moment(endDate, 'MM/DD/YYYY').diff(
      moment(lastDateWithData, 'MM/DD/YYYY'),
      'days'
    );

    let avgDailyRemainingConsumption = (reminingConsumption / numDaysMissingData).toFixed(
      3
    );

    // // Add average daily usage field to the existing data pulled from API
    dailyData.forEach((obj) => {
      obj.avgDailyConsumption = avgDailyConsumption;
    });

    // // Build out daily data array to include the days in the future that are in this period
    // // Using this to make sure we show a whole month at a time on the graph, and as days progress
    // // more of the month gets filled in.  Can graphically see how far into the month you are.

    let dateToAdd = moment(lastDateWithData, 'MM/DD/YYYY')
      .add(1, 'days')
      .format('MM/DD/YYYY');

    // // Loop through and add the next date to the data set until you get to the last day of the period
    while (moment(dateToAdd, 'MM/DD/YYYY') <= moment(endDate, 'MM/DD/YYYY')) {
      dailyData.push({
        readDate: dateToAdd,
        avgDailyRemainingConsumption: avgDailyRemainingConsumption,
        avgDailyConsumption: avgDailyConsumption,
      });

      dateToAdd = moment(dateToAdd, 'MM/DD/YYYY').add(1, 'days').format('MM/DD/YYYY');
    }

    // // create an array of just the dates, to label the X axis
    let chartLabels = [];
    dailyData.forEach((obj) => {
      chartLabels.push(moment(obj.readDate, 'MM/DD/YYYY').format('ddd, MMM Do'));
    });

    let charting = {
      chartLabels: [],
      daily: [],
      avgDailyConsumption: [],
      avgRemaining: [],
    };
    dailyData.forEach((obj) => {
      charting.chartLabels.push(moment(obj.readDate, 'MM/DD/YYYY').format('ddd, MMM Do'));
      charting.daily.push(obj.energyDataKwh);
      charting.avgDailyConsumption.push(obj.avgDailyConsumption);

      charting.avgRemaining.push(avgDailyRemainingConsumption);
    });

    // Find yesterday's usage.  Yesterday's usage doesn't show in the main api data until approx 3pm the next day.
    // So first we'll look and see if it's available in dataData and use it if it is.
    // If it's not available, we'll have to calculate it from the manual reads.

    let yesterday = moment().add(-1, 'days').format('MM/DD/YYYY');

    let findYesterdayUsage = dailyData.find((o) => o.readDate === yesterday)
      .energyDataKwh;

    if (findYesterdayUsage) {
      // Yesterday's data is in dailyData, so use it
      yesterdayUsage = findYesterdayUsage;
    } else {
      // Yesterday's data is not in dailyDailt so calculate it
      yesterdayUsage = 999;
    }

    console.log('  ---');
    console.log('Yesterday usage was', yesterdayUsage);
    console.log('  ---');

    return res.status(200).send({
      billingPeriod: {
        daysIntoPeriod: daysIntoPeriod,
        lastDateWithData: lastDateWithData,
        totalConsumption: totalConsumption.toFixed(3),
        avgDailyConsumption: avgDailyConsumption,
        reminingConsumption: reminingConsumption,
        yesterdayUsage: yesterdayUsage,
        todayUsage: 0,
      },
      dailyData: dailyData,
      charting: charting,
    });
  },

  async get_daily_usage(req, res, next) {},
};
