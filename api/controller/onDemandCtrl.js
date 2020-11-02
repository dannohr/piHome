const db = require("../models/meterReader/index");
const moment = require("moment");
const { Op, literal } = require("sequelize");

const getDemandReadData = require("../util/requestOnDemandRead")
  .getDemandReadData;

const getLastOnDemandRequest = require("../util/requestOnDemandRead")
  .getLastOnDemandRequest;

const requestOnDemandRead = require("../util/requestOnDemandRead")
  .requestOnDemandRead;

const delay = require("../util/requestOnDemandRead").delay;

function replacer(i, val) {
  if (val === null) {
    return ""; // change null to empty string
  } else {
    return val; // return unchanged
  }
}

module.exports = {
  async get_all(req, res, next) {
    console.log("getting all on demand read");

    try {
      const onDemandData = await db.OnDemandReadRequest.findAll({ raw: true });

      onDemandData.forEach((o) => {
        o.formattedDate = o.readDate
          ? moment(o.readDate, "YYYY-MM-DD HH:mm:s Z").format(
              "hh:mm:ss a M/D/YYYY"
            )
          : null;

        o.requested = o.requestTime
          ? moment(o.requestTime, "YYYY-MM-DD HH:mm:s Z").format(
              "hh:mm:ss a M/D/YYYY"
            )
          : null;
      });

      // replacer turns nulls to empy strings
      return res.status(200).send(JSON.stringify(onDemandData, replacer));
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async add_onDemand(req, res, next) {
    console.log("adding onDemand meter read");
    console.log("Data is: ", req.body);

    try {
      const post = await db.OnDemandReadRequest.create(req.body);
      return res.status(201).json({
        post,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  async delete_onDemand(req, res, next) {
    console.log("Deleting onDemand Request");
    console.log("Deleting ID: ", req.params.id);

    try {
      const del = await db.OnDemandReadRequest.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(201).json({
        del,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async edit_onDemand(req, res, next) {
    console.log("Editing onDemand meter read");
    console.log("Editing ID: ", req.params.id);
    console.log("The body is:");
    console.log(req.body);

    try {
      const update = await db.OnDemandReadRequest.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      return res.status(201).json({
        update,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  async get_on_demand_read(req, res, next) {
    console.log("getting new on demand read from SMT");

    let priorOnDemandRead = {};
    let newOnDemandRead = {};
    let newOnDemandReadData = {};
    let requestNew = {};

    try {
      // Look up the last requested on demand read
      lastOnDemandRead = await getLastOnDemandRequest();

      console.log(lastOnDemandRead);

      // If the last manual read attempt doesn't have a "registeredRead", get the data from SMT and update
      // the database.  This can happen if there's a long delay, or error, with the SMT API when the previous
      // read was requested
      if (!lastOnDemandRead.registeredRead) {
        console.log("there is a pending read to get the data");
        priorOnDemandRead = await getDemandReadData(lastOnDemandRead);
        console.log(priorOnDemandRead);
      }

      console.log("-----  All prior activity cleaned up, starting new  -----");

      // ------------------------------------------------------------------------------
      // let newEntry = {
      //   trans_id: 1234,
      //   correlationId: 56678,
      //   statusCode: "test",
      //   statusReason: "test",
      //   requestTime: Date.now(),
      // };
      // // save response to database.
      // newOnDemandRead = await db.OnDemandReadRequest.create(newEntry)
      //   .then((data) => {
      //     console.log("Data added to database");
      //     return { newEntry: newEntry, data: data };
      //   })
      //   .catch((error) => console.log(error));
      // ------------------------------------------------------------------------------

      // if (lastOnDemandRead.registeredRead) {
      //   console.log("there is no pending read so request a new one");

      // Make a new request
      requestNew = await requestOnDemandRead();

      // look up the data for the pending request
      newOnDemandRead = await getLastOnDemandRequest();

      //   // now that we've requested it, wait 30 seconds and try to get the data
      for (i = 1; i < 11; i++) {
        console.log("try number ", i);
        await delay(10000);
        console.log("Waited 5s");
        newOnDemandReadData = await getDemandReadData(newOnDemandRead);
        if (newOnDemandReadData.odrRead.registeredRead) {
          i = 11;
        }
        console.log(newOnDemandReadData);
      }

      return res.status(200).send({
        lastOnDemandRead: lastOnDemandRead,
        priorOnDemandRead: priorOnDemandRead,
        newOnDemandRead: newOnDemandRead,
        requestNew: requestNew,
        newOnDemandReadData: newOnDemandReadData,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
