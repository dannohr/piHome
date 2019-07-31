const axios = require("axios");

const ip = "192.168.1.98";

module.exports = {
  current_status(req, res, next) {
    console.log("getting current thermostat status");

    let url = "http://" + ip + "/tstat";
    console.log(url);

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
