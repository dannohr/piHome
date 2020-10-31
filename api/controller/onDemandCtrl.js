const db = require("../models/meterReader/index");
const moment = require("moment");
const { Op, literal } = require("sequelize");



function replacer(i, val) {
  if ( val === null ) 
  { 
     return ""; // change null to empty string
  } else {
     return val; // return unchanged
  }
 }


module.exports = {
  

  async get_all(req, res, next) {
    console.log("getting all on demand read");

    try {

      const onDemandData = await db.OnDemandReadRequest.findAll({
        where: {
  
          id: {
            [Op.gte]: 1,
          },
  
          


          // start date less than or equal to today
          // start: {
          //   [Op.lte]: dateToUse,
          // },
          // end date greater than or equal to today
          // end: {
          //   [Op.gte]: dateToUse,
          // },
        },
        raw: true,
      });
  
      // replacer turns nulls to empy strings
      return res.status(200).send(JSON.stringify(onDemandData, replacer))

     
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async add_daily(req, res, next) {
    console.log("adding daily meter read");
    console.log("Data is: ", req.body);

    try {
      const post = await db.Daily.create(req.body);
      return res.status(201).json({
        post,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  async delete_daily(req, res, next) {
    console.log("Deleting daily meter read");
    console.log("Deleting ID: ", req.params.id);

    try {
      const del = await db.Daily.destroy({
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

  async edit_daily(req, res, next) {
    console.log("Editing daily meter read");
    console.log("Deleting ID: ", req.params.id);
    console.log("The body is:");
    console.log(req.body);

    try {
      const update = await db.Daily.update(req.body, {
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

  async get_onDemand_data(req, res, next) {
    let today = moment().format("YYYY-MM-DD");

    console.log("getting onDemand data");
    console.log("today is: ", today);

    // OnDemandReadRequest

    const onDemandData = await db.OnDemandReadRequest.findAll({
      where: {

        id: {
          [Op.gte]: 1,
        },

        // start date less than or equal to today
        // start: {
        //   [Op.lte]: dateToUse,
        // },
        // end date greater than or equal to today
        // end: {
        //   [Op.gte]: dateToUse,
        // },
      },
      raw: true,
    });

    // replacer turns nulls to empy strings
    return res.status(200).send(JSON.stringify(onDemandData, replacer))
    
       
    
  },
};
