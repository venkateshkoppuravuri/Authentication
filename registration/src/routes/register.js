const db = require("../database/mysqlConnection");
const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 11;

router.post("/register", (req, res) => {
  const { name, email, password, country } = req.body;

  let sql = `SELECT email from userCredentials where email = ?`;

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      errorResponse = true;
      res.send({
        message: "Email already in use",
      });
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    let user = {
      name: name,
      email: email,
      password: encryptedPassword,
      country: country,
    };
    console.log(user);

    sql = `INSERT INTO userCredentials SET ?`;

    db.query(sql, user, (err) => {
      if (err) {
        res.send({
          message: "user not created",
        });
        return;
      } else {
        res.send({
          message: "user created sucessfully",
        });
        return;
      }
    });
  });
});

module.exports = router;
