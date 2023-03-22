// require("dotenv").config();
// // const mysql = require("mysql");
// // const connection = mysql.createConnection({
// //   host: process.env.HOST_NAME,
// //   user: process.env.USER_NAME,
// //   password: process.env.PASSWORD,
// //   database: process.env.DB_NAME,
// //   port: 3306,
// // });
// // module.exports = connection;

const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: "akillme",
  host: "dpg-cgddjot269v52g6vk9u0-a.singapore-postgres.render.com",
  database: "dbusers",
  password: "drzNSmdGzQCB9m0jA9iZJMT07v7RoI7b",
  port: 5432,
});
pool.query("SELECT * FROM users", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    console.log("Connected to database at", res.rows[0].now);
  }
});
module.exports = pool;
