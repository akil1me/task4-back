require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const users = require("./users-conn.js");

const app = express();
const POST = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.post("/register", users.onRegister);
app.post("/login", users.onLogin);
app.get("/users", users.onGet);
app.delete("/users", users.onDelete);
app.put("/users", users.onStatus);

app.listen(POST, () => {
  console.log(`Server listening at http://localhost:${POST}`);
});
