const connection = require("./db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Users {
  onRegister(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    connection.query(
      "INSERT INTO users (name, email, password, registered_at, last_login_at, status) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, hashedPassword, new Date(), null, "active"],
      (error, results) => {
        if (error) {
          res.status(500).json({ message: error });
        } else {
          res.json(results);
        }
      }
    );
  }
  onGet(_, res) {
    connection.query(
      "SELECT `id`, `name`, `email`, `registered_at`, `last_login_at`, `status` FROM `users` WHERE 1",
      (error, results) => {
        if (error) {
          res.status(500).json(error);
        } else {
          const users = results;
          res.json(users);
        }
      }
    );
  }

  onLogin(req, res) {
    const { email, password } = req.body;
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (error, results) => {
        if (error) {
          res.status(500).json({ message: "Error logging in" });
        } else {
          if (results.length > 0) {
            const user = results[0];

            if (bcrypt.compareSync(password, user.password)) {
              const token = jwt.sign({ id: user.id }, "secret-key", {
                expiresIn: "1h",
              });
              res.cookie("token", token, { httpOnly: true });
              const date = new Date();
              connection.query(
                `UPDATE users SET last_login_at = ? WHERE users.id = ${user.id}`,
                [date]
              );
              res.json(user);
            } else {
              res.status(401).json({ message: "Invalid password" });
            }
          } else {
            res.status(401).json({ message: "Invalid email" });
          }
        }
      }
    );
  }
}

module.exports = new Users();
