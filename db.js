require("dotenv").config();
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = connection;
