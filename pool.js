const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = pool;
