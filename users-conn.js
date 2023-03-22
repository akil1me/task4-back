const pool = require("./pool.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Users {
  onRegister(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    pool.query(
      "INSERT INTO users (name, email, password, registered_at, last_login_at, status) VALUES ($1, $2, $3, $4, $5, $6)",
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
    pool.query(
      "SELECT id, name, email, registered_at, last_login_at, status FROM users",
      (error, results) => {
        if (error) {
          res.status(500).json(error);
        } else {
          const users = results.rows;
          res.json(users);
        }
      }
    );
  }

  onLogin(req, res) {
    const { email, password } = req.body;
    pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      (error, results) => {
        if (error) {
          res.status(500).json({ message: "Error logging in" });
        } else {
          if (results.rows.length > 0) {
            const user = results.rows[0];

            if (bcrypt.compareSync(password, user.password)) {
              const token = jwt.sign({ id: user.id }, "secret-key", {
                expiresIn: "1h",
              });
              res.cookie("token", token, { httpOnly: true });
              const date = new Date();
              pool.query(
                "UPDATE users SET last_login_at = $1 WHERE users.id = $2",
                [date, user.id]
              );
              res.json({
                user: { id: user.id, name: user.name, email: user.email },
                token: token,
              });
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

  onStatus(req, res) {
    const { status, id } = req.body;
    console.log(id.join(","));
    pool.query(
      `UPDATE users SET status = $1 WHERE id IN (${id.join(",")}) RETURNING *`,
      [`${status}`],
      (error, results) => {
        if (error) {
          res.status(500).json({ message: error });
        } else {
          res.json(results);
        }
      }
    );
  }

  onDelete(req, res) {
    const id = req.body;
    pool.query(
      `DELETE FROM users WHERE id IN (${id.join(",")})
    RETURNING *`,
      (error, results) => {
        if (error) {
          res.status(500).json({ message: error });
        } else {
          res.json(results);
        }
      }
    );
  }
}

module.exports = new Users();
