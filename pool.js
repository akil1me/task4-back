const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: "akobir",
  host: "dpg-cgdg8bl269v52g7nok10-a.oregon-postgres.render.com",
  database: "akobirdb",
  password: "GYUYH9hE89UTSBCkaHljG57BNqfCqcIW",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = pool;
