require("dotenv").config();
const db = require("../models/meterReader/index");
const moment = require("moment");
const https = require("https");
const axios = require("axios");
const fs = require("fs");
const { Op, literal } = require("sequelize");

const smtUrl = process.env.smtUrl;
const smtUserName = process.env.smtUserName;
const smtPassword = process.env.smtPassword;
const smtEsiid = process.env.smtEsiid;

const instance = axios.create({
  httpsAgent: new https.Agent({
    cert: fs.readFileSync("./config/certs/cert.pem"),
    key: fs.readFileSync("./config/certs/privkey.pem"),
    rejectUnauthorized: false,
  }),
});

const smtApiPost = async (body, site) => {
  return await instance({
    method: "post",
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

const getLastOnDemandRequest = async () => {
  return await db.OnDemandReadRequest.findAll({
    where: { statusCode: 0 },
    attributes: [db.sequelize.fn("MAX", db.sequelize.col("trans_id"))],
    raw: true,
  }).then((data) => {
    if (data[0]) {
      // The above findAll returns the max trans_id
      let maxTransId = data[0]["MAX(`trans_id`)"];

      // Tehe below findAll returns all the data correspnding to that trans_id
      return db.OnDemandReadRequest.findAll({
        where: { trans_id: maxTransId },

        raw: true,
      }).then((data) => {
        return data[0];
      });
    } else {
      console.log("returning null");
      return null;
    }
  });
};

const requestOnDemandRead = async () => {
  console.log("Starting On Demand Read Request");
  console.log(" ");
  let trans_id = Date.now().toString();
  let body = {
    trans_id: trans_id,
    requesterType: "RES",
    requestorID: smtUserName,
    deliveryMode: "API",
    ESIID: smtEsiid,
    SMTTermsandConditions: "Y",
  };

  // const responseData = await makeReadRequest();
  const responseData = await smtApiPost(body, "odr/");

  let newEntry = {
    trans_id: responseData.trans_id,
    correlationId: responseData.correlationId,
    statusCode: responseData.statusCode,
    statusReason: responseData.statusReason,
    requestTime: Date.now(),
  };

  console.log("--------------------");
  console.log(newEntry);
  console.log("--------------------");
  // save response to database.
  return db.OnDemandReadRequest.create(newEntry)
    .then((data) => {
      console.log("Data added to database");
      return { newEntry: newEntry, data: data };
    })
    .catch((error) => console.log(error));
};

const getDemandReadData = async (needRegisteredRead) => {
  console.log("Starting to Get On Demand Meter Read Data ");

  let body = {
    trans_id: needRegisteredRead.trans_id,
    requestorID: smtUserName,
    correlationId: needRegisteredRead.correlationId,
    SMTTermsandConditions: "Y",
  };

  const responseData = await smtApiPost(body, "odrstatus/");

  if (responseData.statusCode === "PEN") {
    console.log("On Demand Read Still Pending");
    return false;
  } else {
    return await db.OnDemandReadRequest.update(
      {
        registeredRead: responseData.odrRead.registeredRead,
        readDate: responseData.odrRead.readDate,
      },
      {
        where: {
          trans_id: responseData.trans_id,
        },
      }
    ).then((response) => {
      console.log("Data added to database");
      console.log(response);
      return responseData;
    });
  }
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

module.exports = {
  requestOnDemandRead: requestOnDemandRead,
  getDemandReadData: getDemandReadData,
  getLastOnDemandRequest: getLastOnDemandRequest,
  delay: delay,
};
