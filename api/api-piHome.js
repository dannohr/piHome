const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();

const weatherRouter = require("./routes/weather");
const thermoRouter = require("./routes/thermostat");

const app = express();
const port = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/thermostat", thermoRouter);
app.use("/weather", weatherRouter);

app.listen(port, () => {
  console.log("Express server listening on port " + port);
});
