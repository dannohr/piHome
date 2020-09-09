const db = require("../models/meterReader/index");
const moment = require("moment");
const https = require("https");
const axios = require("axios");
const fs = require("fs");
const { Op, literal } = require("sequelize");

const url = "https://services.smartmetertexas.net/dailyreads/";
const username = "dannohr";
const password = "unr4daniel";
const esiid = "10443720000043008";

const instance = axios.create({
  httpsAgent: new https.Agent({
    cert: fs.readFileSync("./config/certs/cert.pem"),
    key: fs.readFileSync("./config/certs/privkey.pem"),
    rejectUnauthorized: false,
  }),
});

module.exports = {
  async get_period_date_rage(req, res, next) {
    console.log(req.params.date);

    let dateToUse = req.params.date
      ? moment(req.params.date).subtract(0, "days").format("YYYY-MM-DD")
      : moment();

    console.log("Date using for lookup", dateToUse);

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

    console.log("-----------------------------------------------");
    console.log(currentPeriod);
    console.log("-----------------------------------------------");

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

    // round to no decimal places, the following returned a non interger.  In October 2019 got 30.04 instead of 30 days

    daysInPeriod = Math.round(daysInPeriod * 10) / 10;

    console.log("Days in Period are:", daysInPeriod);
    console.log(
      "Dates ",
      periodStart.format("MM-DD-YYYY"),
      " through ",
      periodEnd.format("MM-DD-YYYY")
    );

    return res.status(200).send({
      billingPeriod: {
        billingStart: periodStart.format("YYYY-MM-DD"),
        billingEnd: periodEnd.format("YYYY-MM-DD"),
        daysInPeriod: daysInPeriod,
      },
    });
  },

  async get_period_daily_data(req, res, next) {
    console.log("------------------");
    console.log(req.body);
    console.log("------------------");

    let startDate = req.body.data.startDate;
    let endDate = !moment(req.body.data.endDate, "MM/DD/YYYY").isBefore(
      moment(),
      "day"
    )
      ? moment().format("MM/DD/YYYY")
      : req.body.data.endDate;

    await instance({
      method: "post",
      url: url,
      data: {
        trans_id: "123",
        requestorID: username,
        requesterType: "RES",
        startDate: startDate,
        endDate: endDate,
        reportFormat: "JSON",
        version: "L",
        readingType: "c",
        esiid: [esiid],
        SMTTermsandConditions: "Y",
      },

      auth: {
        username: username,
        password: password,
      },
    })
      .then((response) => {
        let dailyData = response.data.registeredReads;

        let totalConsumption = response.data.registeredReads.reduce(function (
          a,
          b
        ) {
          return a + b.energyDataKwh * 1;
        },
        0);

        let lastDateWithData = dailyData[dailyData.length - 1].readDate;
        let avgDailyConsumption = totalConsumption / dailyData.length;

        let avgEstReminingConsumption = Math.max(0, 1000 - totalConsumption);

        return res.status(200).send({
          billingPeriod: {
            daysIntoPeriod: dailyData.length,
            lastDateWithData: lastDateWithData,
            // daysToGoInPeriod: daysInPeriod - currentPeriodDailyData.length,
            totalConsumption: totalConsumption,
            avgDailyConsumption: avgDailyConsumption,
            avgEstReminingConsumption: avgEstReminingConsumption,
          },
          dailyData: dailyData,
        });
      })
      .catch((err) => console.log(err));

    // return res.json.status(200).send(data);
  },
};
