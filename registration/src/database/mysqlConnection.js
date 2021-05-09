const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Satti@18",
  database: "db_assignment_2",
  multipleStatements: true,
});

connection.connect((err) => {
  if (!err) {
    console.log("Database is connected ...");
  } else {
    console.log("Error connecting database ...");
  }
});

module.exports = connection;
