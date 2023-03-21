require("dotenv").config();
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
});
module.exports = connection;
