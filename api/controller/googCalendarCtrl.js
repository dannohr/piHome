"use strict";

const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const moment = require("moment");

const path = require("path"),
  appDir = path.dirname(require.main.filename);

//   googleAuth = require("google-auth-library");
const googleAuth = require("google-auth-library");

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
// Then run again `node build_token.js`
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

const TOKEN_PATH = "./config/token.json";

function authorize(credentials, callback, res, options) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;

  const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      console.log(err);
      console.log("Build your tokens first, by execute `node build_token.js`");
    } else {
      oauth2Client.credentials = JSON.parse(token);
      return callback(oauth2Client, res, options);
    }
  });
}

// const authorize = (credentials, callback, res, options = {}) => {
//   console.log(googleAuth);
//   const clientSecret = credentials.installed.client_secret;
//   const clientId = credentials.installed.client_id;
//   const redirectUrl = credentials.installed.redirect_uris[0];
//   const auth = new googleAuth();
//   const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) {
//       console.log("Build your tokens first, by execute `node build_token.js`");
//     } else {
//       oauth2Client.credentials = JSON.parse(token);
//       return callback(oauth2Client, res, options);
//     }
//   });
// };

// API major part
const listEvents = (auth, res, options) => {
  const TODAY = new Date(new Date().setHours(0, 0, 0, 0));
  const calendar = google.calendar({ version: "v3", auth });
  const condition = {
    // calendarId: "primary",
    calendarId: "plmtdllc13e8c1gdodar0ch5n4@group.calendar.google.com",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime"
  };

  calendar.events.list(condition, (err, response) => {
    if (err) {
      console.log("The API returns an error: ", err);
      res.json({ error: err });
    }
    const eventsDetailed = response.data.items;
    const events = [];

    eventsDetailed.map((event, i) => {
      const start = event.start.date
        ? moment(event.start.date, "YYYY-MM-DD").toDate()
        : moment(event.start.dateTime).toDate();

      const id = event.id;

      const end = event.end.dateTime || event.end.date;
      const title = event.summary;
      const allDetails = event;

      events.push({
        id: id,
        title: title,
        start: start,
        end: end,
        allDetails: allDetails
      });
      // console.log(`${start} - ${event.summary}`);
    });

    res.json(events);
  });
};

const getEvent = (auth, res, options) => {
  const calendar = google.calendar("v3");
  calendar.events.get(
    {
      auth: auth,
      // calendarId: "primary",
      calendarId: "plmtdllc13e8c1gdodar0ch5n4@group.calendar.google.com",
      eventId: options.eventId
    },
    (err, response) => {
      if (err) {
        console.log("The API returns an error: ", err);
        res.json({ error: err });
      }
      console.log(response);
      res.json(response);
    }
  );
};

const addEvent = (auth, res, options) => {
  const calendar = google.calendar("v3");
  const summary = options.summary;
  const startTime = options.startTime;
  const endTime = options.endTime;
  const event = {
    summary: summary,
    start: {
      dateTime: startTime
    },
    end: {
      dateTime: endTime
    }
  };
  console.log("add Event: ", event);
  calendar.events.insert(
    {
      auth: auth,
      calendarId: "primary",
      resource: event
    },
    (err, response) => {
      if (err) {
        console.log("Error: ", err);
        res.json({ error: err });
      }
      res.json(response);
    }
  );
};

const updateEvent = (auth, res, options) => {
  const calendar = google.calendar("v3");
  calendar.events.update(
    {
      auth: auth,
      calendarId: "primary",
      eventId: options.eventId,
      resources: options.resources
    },
    (err, response) => {
      if (err) {
        console.log("Error: ", err);
        res.json({ error: err });
      }
      res.json(response);
    }
  );
};

const removeEvent = (auth, res, options) => {
  const calendar = google.calendar("v3");
  calendar.events.delete(
    {
      auth: auth,
      calendarId: "primary",
      eventId: options.eventId
    },
    err => {
      if (err) {
        console.log("Error: ", err);
        res.json({ error: err });
      }
      res.json({ status: 200, message: "Deleted event successfully" });
    }
  );
};

exports.index = (req, res) => {
  fs.readFile("./config/credentials.json", (err, content) => {
    // console.log(content);
    if (err) {
      console.log(
        "looking here" +
          appDir +
          "/client_secret.json " +
          "Get error when loading client secret file: " +
          err
      );
      return;
    }
    console.log("getting events");
    authorize(JSON.parse(content), listEvents, res);
  });
};

exports.create = (req, res) => {
  const startTime = parseInt(req.params.startTime);
  const endTime = startTime + 1000 * 60 * 30;
  const options = {
    summary: req.params.summary || "No title",
    startTime: new Date(startTime).toISOString(),
    endTime: new Date(endTime).toISOString()
  };

  fs.readFile(appDir + "/client_secret.json", (err, content) => {
    if (err) {
      console.log("Get error when loading client secret file: " + err);
      return;
    }
    authorize(JSON.parse(content), addEvent, res, options);
  });
};

exports.show = (req, res) => {
  fs.readFile(appDir + "/client_secret.json", (err, content) => {
    if (err) {
      console.log(
        "looking here" +
          appDir +
          "/client_secret.json " +
          "Get error when loading client secret file: " +
          err
      );
      return;
    }
    authorize(JSON.parse(content), getEvent, res, {
      eventId: req.params.eventId
    });
  });
};

exports.update = (req, res) => {};

exports.destroy = (req, res) => {
  fs.readFile(appDir + "/client_secret.json", (err, content) => {
    if (err) {
      console.log("Get error when loading client secret file: " + err);
      return;
    }
    authorize(JSON.parse(content), removeEvent, res, {
      eventId: req.params.eventId
    });
  });
};
