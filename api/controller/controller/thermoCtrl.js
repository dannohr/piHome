const axios = require("axios");

const ip = require("../config/thermostat");

module.exports = {
  current_status(req, res, next) {
    // console.log("getting current thermostat status");
    // console.log("the ip is ", ip.ip);
    let url = "http://" + ip.ip + "/tstat";
    // console.log(url);

    axios
      .get(url)
      .then(response => {
        let status = response.data;
        status.currentTime = new Date();
        res.status(200).send(status);
      })
      .catch(err => {
        console.log("in .catch in thermostat controller");
        console.log(err);
        res.status(401).send({ error: err.response });
      });
  }
};
