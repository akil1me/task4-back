require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const users = require("./users-conn.js");
const connection = require("./db.js");

const app = express();
const POST = 3306;

connection.connect();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.post("/register", users.onRegister);
app.post("/login", users.onLogin);
app.get("/users", users.onGet);

app.listen(POST, () => {
  console.log(`Server listening at http://localhost:${POST}`);
});
