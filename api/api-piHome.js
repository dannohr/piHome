const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();
const dbHome = require("./models/piHome/index");
const dbSQL = require("./models/meterReader/index");

const weatherRouter = require("./routes/weather");
const thermoRouter = require("./routes/thermostat");
const stocksRouter = require("./routes/stocks");
const calendarRouter = require("./routes/calendar");
const meterReaderRouter = require("./routes/meterReader");

const app = express();
const port = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use("/api/thermostat", thermoRouter);
app.use("/api/weather", weatherRouter);
app.use("/api/stocks", stocksRouter);
app.use("/api/calendar", calendarRouter);
app.use("/api/meterReader", meterReaderRouter);

app.listen(port, () => {
  console.log("Express server listening on port " + port);
});
