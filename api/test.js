// https://stackoverflow.com/questions/52026847/how-to-do-https-get-with-client-certificate-in-axios

var axios = require("axios");
var https = require("https");
var fs = require("fs");

var instance = axios.create({
  httpsAgent: new https.Agent({
    cert: fs.readFileSync("./config/certs/cert.pem"),
    key: fs.readFileSync("./config/certs/privkey.pem"),
    rejectUnauthorized: false,
  }),
});

let url = "https://services.smartmetertexas.net/dailyreads/";

instance({
  method: "post",
  url: url,
  data: {
    trans_id: "123",
    requestorID: "dannohr",
    requesterType: "RES",
    startDate: "09/01/2020",
    endDate: "09/09/2020",
    reportFormat: "JSON",
    version: "L",
    readingType: "c",
    esiid: ["10443720000043008"],
    SMTTermsandConditions: "Y",
  },

  auth: {
    username: "dannohr",
    password: "unr4daniel",
  },
})
  .then(function (response) {
    console.log(response.data);
  })
  .catch((err) => console.log(err));
