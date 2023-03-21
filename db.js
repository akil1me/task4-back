require("dotenv").config();
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "demo-db.cr7w6cd4vc45.eu-north-1.rds.amazonaws.com",
  user: "admin",
  password: "20020124",
  database: "demo-db",
});
module.exports = connection;
