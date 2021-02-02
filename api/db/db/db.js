const sqlite3 = require("sqlite3").verbose();

//Import sqlite to read database
//Connect to database
let db = new sqlite3.Database("piHome.db", err => {
  if (err) {
    console.log("there was an error");
    console.error(err.message);
  } else {
    console.log("Connected to the database.");
  }
});

module.exports = db;
